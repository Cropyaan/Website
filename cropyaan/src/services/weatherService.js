/**
 * weatherService.js
 * Fetches weather data from Open-Meteo (free, no API key required).
 * Docs: https://open-meteo.com/en/docs
 *
 * Returns structured weather object used by the recommendation engine.
 */

const OPEN_METEO_BASE = "https://api.open-meteo.com/v1/forecast";

/**
 * Fetch current + aggregated weather for a lat/lng pair.
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<WeatherData>}
 */
export async function fetchWeatherData(lat, lng) {
  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lng.toFixed(4),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "weather_code",
    ].join(","),
    forecast_days: 7,
    timezone: "Asia/Kolkata",
  });

  const url = `${OPEN_METEO_BASE}?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return parseWeatherResponse(data);
}

/**
 * Parse Open-Meteo response into a clean, flat object.
 */
function parseWeatherResponse(data) {
  const current = data.current || {};
  const daily = data.daily || {};

  // Average over 7-day forecast
  const avgTempMax = average(daily.temperature_2m_max || []);
  const avgTempMin = average(daily.temperature_2m_min || []);
  const avgTemp = (avgTempMax + avgTempMin) / 2;
  const totalRainfall = sum(daily.precipitation_sum || []);
  const monthlyRainfallEstimate = (totalRainfall / 7) * 30; // extrapolate to monthly

  return {
    current: {
      temperature: roundOne(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      precipitation: roundOne(current.precipitation ?? 0),
      windSpeed: roundOne(current.wind_speed_10m),
      weatherCode: current.weather_code,
    },
    weekly: {
      avgTempMax: roundOne(avgTempMax),
      avgTempMin: roundOne(avgTempMin),
      avgTemp: roundOne(avgTemp),
      totalRainfall: roundOne(totalRainfall),
      dailyMaxTemps: daily.temperature_2m_max || [],
      dailyMinTemps: daily.temperature_2m_min || [],
      dailyPrecipitation: daily.precipitation_sum || [],
    },
    // Values used by recommendation engine
    forEngine: {
      temperature: roundOne(current.temperature_2m ?? avgTemp),
      rainfall: roundOne(monthlyRainfallEstimate),
    },
    raw: data,
  };
}

/** Weather code → human-readable label (WMO standard) */
export function weatherCodeToLabel(code) {
  const map = {
    0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
    45: "Fog", 48: "Icy Fog",
    51: "Light Drizzle", 53: "Moderate Drizzle", 55: "Heavy Drizzle",
    61: "Slight Rain", 63: "Moderate Rain", 65: "Heavy Rain",
    71: "Slight Snow", 73: "Moderate Snow", 75: "Heavy Snow",
    80: "Slight Showers", 81: "Moderate Showers", 82: "Heavy Showers",
    95: "Thunderstorm", 96: "Hail Thunderstorm",
  };
  return map[code] || "Variable";
}

/** Weather code → emoji */
export function weatherCodeToEmoji(code) {
  if (code === 0 || code === 1) return "☀️";
  if (code === 2 || code === 3) return "⛅";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95) return "⛈️";
  return "🌤️";
}

// ── helpers ──────────────────────────────────────────────────────────────────
const average = (arr) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
const sum = (arr) => arr.reduce((a, b) => a + b, 0);
const roundOne = (n) => n != null ? Math.round(n * 10) / 10 : null;