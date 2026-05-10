// ─────────────────────────────────────────────────────────────────────────────
// components/WeatherAdvisory/SearchBar.jsx
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconSearch = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const IconAlert = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconMapPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ── Suggestion data ───────────────────────────────────────────────────────────


// ── Main Component ────────────────────────────────────────────────────────────
export default function SearchBar({ inputVal, onInputChange, loading, error, onSubmit }) {
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState([]);
  const [showDrop, setShowDrop]       = useState(false);
  const [activeIdx, setActiveIdx]     = useState(-1);
  const wrapperRef                    = useRef(null);

  const debounceRef = useRef(null);

const handleChange = useCallback((val) => {
  onInputChange(val);
  setActiveIdx(-1);
  if (val.trim().length < 2) { setSuggestions([]); setShowDrop(false); return; }

  clearTimeout(debounceRef.current);
  debounceRef.current = setTimeout(async () => {
    try {
      const res  = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&countrycodes=in&format=json&limit=7&addressdetails=1`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      const matches = data.map((place) => {
        const city  = place.address.city || place.address.town || place.address.village || place.address.county || place.name;
        const state = place.address.state || "";
        return { label: `${city}, ${state}`.replace(/, $/, ""), cityOnly: city };
      });
      // deduplicate by label
      const seen   = new Set();
      const unique = matches.filter(({ label }) => seen.has(label) ? false : seen.add(label));
      setSuggestions(unique);
      setShowDrop(unique.length > 0);
    } catch {
      setSuggestions([]);
      setShowDrop(false);
    }
  }, 300);
}, [onInputChange]);

const pickSuggestion = useCallback((item) => {
  onInputChange(item.cityOnly);
  setSuggestions([]);
  setShowDrop(false);
  setActiveIdx(-1);
}, [onInputChange]);

  const handleKeyDown = (e) => {
    if (!showDrop) return;
    if (e.key === "ArrowDown")  { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, -1)); }
    else if (e.key === "Enter" && activeIdx >= 0) { e.preventDefault(); pickSuggestion(suggestions[activeIdx]); }
    else if (e.key === "Escape") setShowDrop(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setShowDrop(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <section className="wa-search-section">
      <div className="wa-search-wrapper" ref={wrapperRef}>
        <form onSubmit={(e) => { setShowDrop(false); onSubmit(e); }} className="wa-search-form">
          <span className="wa-search-icon-left"><IconSearch /></span>

          <input
            type="text"
            className="wa-input"
            placeholder={t("weather.placeholder")}
            value={inputVal}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowDrop(true)}
            autoComplete="off"
            spellCheck="false"
          />

          <button type="submit" className="wa-btn" disabled={loading}>
            {loading ? t("weather.btn_searching") : t("weather.btn_search")}
          </button>
        </form>

        {/* Dropdown */}
        {showDrop && (
          <ul className="wa-dropdown" role="listbox">
{suggestions.map((item, i) => (
  <li
    key={item.label}
    className={`wa-dropdown-item${i === activeIdx ? " wa-dropdown-item--active" : ""}`}
    role="option"
    aria-selected={i === activeIdx}
    onMouseDown={(e) => { e.preventDefault(); pickSuggestion(item); }}
    onMouseEnter={() => setActiveIdx(i)}
  >
    <span className="wa-dropdown-pin"><IconMapPin /></span>
    <span className="wa-dropdown-city">{item.label}</span>
  </li>
))}
          </ul>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="wa-error-box">
          <span className="wa-error-icon"><IconAlert /></span>
          <p className="wa-error-text">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="wa-loading">
          <div className="wa-spinner" />
          <p className="wa-loading-text">{t("weather.loading")}</p>
        </div>
      )}
    </section>
  );
}