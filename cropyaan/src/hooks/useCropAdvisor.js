useCropAdvisor.js


/**
 * useCropAdvisor.js
 * Central hook that orchestrates location → weather → soil → season → recommendations.
 *
 * Data flow:
 *  location input
 *    → geocodingService.searchLocation / reverseGeocode
 *    → weatherService.fetchWeatherData (lat, lng)
 *    → soilData.getSoilForRegion (state name)
 *    → seasonUtils.detectSeason (region + current date)
 *    → recommendationEngine.getTopCropRecommendations
 *    → state update → UI render
 */

import { useState, useCallback, useRef } from "react";
import { searchLocation, reverseGeocode } from "../services/geocodingService.js";
import { fetchWeatherData } from "../services/weatherService.js";
import { getSoilForRegion } from "../data/soilData.js";
import { detectSeason, getSeasonNote } from "../utils/seasonUtils.js";
import { getTopCropRecommendations, getLocationAdvisory } from "../utils/recommendationEngine.js";

export const ADVISOR_STATUS = {
  IDLE: "idle",
  SEARCHING: "searching",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const INITIAL_STATE = {
  status: ADVISOR_STATUS.IDLE,
  error: null,
  location: null,
  weather: null,
  soil: null,
  season: null,
  recommendations: [],
  advisory: null,
};

export function useCropAdvisor() {
  const [state, setState] = useState(INITIAL_STATE);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceRef = useRef(null);

  // ── Location search (debounced) ───────────────────────────────────────
  const handleSearchInput = useCallback((query) => {
    setSearchQuery(query);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setState((s) => ({ ...s, status: ADVISOR_STATUS.SEARCHING }));
      try {
        const results = await searchLocation(query);
        setSearchResults(results);
        setState((s) => ({ ...s, status: ADVISOR_STATUS.IDLE, error: null }));
      } catch {
  setState((s) => ({
    ...s,
    status: ADVISOR_STATUS.IDLE,
    error: "Location search failed. Try again."
  }));
}
    }, 400);
  }, []);

  // ── Core analysis: given a location object, fetch everything ──────────
  const analyzeLocation = useCallback(async (locationResult) => {
    setSearchResults([]);
    setSearchQuery(locationResult.shortName);
    setState((s) => ({ ...s, status: ADVISOR_STATUS.LOADING, error: null, location: locationResult }));

    try {
      // 1. Fetch weather data
      const weather = await fetchWeatherData(locationResult.lat, locationResult.lng);

      // 2. Determine soil type from region
      const soil = getSoilForRegion(locationResult.state || locationResult.region);

      // 3. Detect current season
      const seasonData = detectSeason(locationResult.state || locationResult.region);
      const seasonNote = getSeasonNote(seasonData.season.id, locationResult.state);

      // 4. Run recommendation engine
      const recommendations = getTopCropRecommendations({
        season: seasonData.season.id,
        soilId: soil.primary.id,
        temperature: weather.forEngine.temperature,
        rainfall: weather.forEngine.rainfall,
        topN: 3,
      });

      // 5. Optional advisories
      const advisory = getLocationAdvisory({
        temperature: weather.forEngine.temperature,
        rainfall: weather.forEngine.rainfall,
        season: seasonData.season.id,
      });

      setState({
        status: ADVISOR_STATUS.SUCCESS,
        error: null,
        location: locationResult,
        weather,
        soil,
        season: { ...seasonData, note: seasonNote },
        recommendations,
        advisory,
      });
    } catch (err) {
      console.error("[CropAdvisor] Analysis error:", err);
      setState((s) => ({
        ...s,
        status: ADVISOR_STATUS.ERROR,
        error: err.message || "Failed to fetch data. Please check your connection.",
      }));
    }
  }, []);

  // ── Map click handler ─────────────────────────────────────────────────
  const handleMapClick = useCallback(async (lat, lng) => {
    setState((s) => ({ ...s, status: ADVISOR_STATUS.LOADING, error: null }));
    try {
      const location = await reverseGeocode(lat, lng);
      await analyzeLocation(location);
    } catch (_err) {
  console.error(_err);
  setState((s) => ({
    ...s,
    status: ADVISOR_STATUS.ERROR,
    error: "Could not resolve this map location. Try a different spot.",
  }));
}
  }, [analyzeLocation]);

  // ── Select from search suggestions ───────────────────────────────────
  const selectLocation = useCallback((locationResult) => {
    analyzeLocation(locationResult);
  }, [analyzeLocation]);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
    setSearchResults([]);
    setSearchQuery("");
  }, []);

  return {
    // State
    ...state,
    searchQuery,
    searchResults,
    // Actions
    handleSearchInput,
    selectLocation,
    handleMapClick,
    reset,
  };
}