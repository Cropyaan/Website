// ─────────────────────────────────────────────────────────────────────────────
// components/WeatherAdvisory/WeatherAdvisory.jsx
// Parent container — all weather logic delegated to weatherEngine.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import SearchBar    from "./SearchBar";
import WeatherStats from "./WeatherStats";
import AdvisoryList from "./AdvisoryList";
import "./WeatherAdvisory.css";

import { fetchWeatherData }  from "../../services/weatherService";
import { analyzeWeather }    from "../../utils/weatherEngine";

// ── useInView ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Layout primitives ─────────────────────────────────────────────────────────
function GrainOverlay() {
  return <div className="wa-grain" aria-hidden="true" />;
}
function Separator() {
  return <div className="wa-separator" role="separator" />;
}
function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`wa-fadein ${inView ? "wa-fadein--visible" : "wa-fadein--hidden"}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function WeatherAdvisory() {
  const { t } = useTranslation();

  const [inputVal, setInputVal] = useState("");
  const [weather,  setWeather]  = useState(null);  // raw display data
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  // Run the engine only when weather data changes — not on every keystroke
  const analysis = useMemo(
    () => weather ? analyzeWeather(weather) : null,
    [weather]
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (!query) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Geocode city name → lat/lng
      // const geoRes  = await fetch(
      //   `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`
      // );
      // const geoData = await geoRes.json();
      // const place   = geoData.results?.[0];
      // if (!place) throw new Error(`Location "${query}" not found. Try a nearby city.`);
      const geoRes  = await fetch(
  `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=in&format=json&limit=1`,
  { headers: { "Accept-Language": "en" } }
);
const geoData = await geoRes.json();
const place   = geoData?.[0];
if (!place) throw new Error(`Location "${query}" not found. Try a nearby city.`);

      // Fetch weather via your weatherService
      // const data = await fetchWeatherData(place.latitude, place.longitude);

      // // Store the flat object the engine + stats card expect
      // setWeather({
      //   city:      `${place.name}, ${place.country}`,
      //   temp:      data.current.temperature,
      //   rainProb: data.current.precipitation_probability ?? data.current.precipitation,
      //   windSpeed: data.current.windSpeed,
      //   humidity:  data.current.humidity,
      // });
      const data = await fetchWeatherData(parseFloat(place.lat), parseFloat(place.lon));

setWeather({
  city:      place.display_name.split(",").slice(0, 2).join(","),  // "Rajahmundry, Andhra Pradesh"
  temp:      data.current.temperature,
  rainProb:  data.current.precipitation_probability ?? data.current.precipitation,
  windSpeed: data.current.windSpeed,
  humidity:  data.current.humidity,
});
    } catch (err) {
      setError(err.message ?? t("weather.error_fetch"));
    } finally {
      setLoading(false);
    }
  }, [inputVal, t]);

  return (
    <>
      <GrainOverlay />
      <div className="wa-page">

        {/* Hero */}
        <section className="wa-hero">
          <div className="wa-hero__glow" aria-hidden="true" />
          <div className="wa-hero__inner">
            <FadeIn delay={0.1}>
              <h1 className="wa-hero__title">
                {t("weather.hero_title1")}{" "}
                <span className="wa-hero__title">{t("weather.hero_title2")}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="wa-hero__subtitle">{t("weather.hero_subtitle")}</p>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* Search */}
<div style={{ position: "relative", zIndex: 10 }}>
  <FadeIn delay={0.1}>
    <SearchBar
      inputVal={inputVal}
      onInputChange={setInputVal}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
    />
  </FadeIn>
</div>

        {/* Results — only rendered once weather + analysis are ready */}
        {weather && analysis && (
          <>
            <Separator />
            <FadeIn>
              <WeatherStats weather={weather} />
            </FadeIn>
            <Separator />
            <FadeIn delay={0.1}>
              <AdvisoryList
                risks={analysis.risks}
                city={weather.city}
              />
            </FadeIn>
          </>
        )}

      </div>
    </>
  );
}