// ─────────────────────────────────────────────────────────────────────────────
// components/WeatherAdvisory/WeatherStats.jsx
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { useTranslation } from "react-i18next";

const IconThermometer = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  </svg>
);

const IconDroplets = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
  </svg>
);

const IconWind = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
  </svg>
);

function StatCard({ icon, label, value, unit }) {
  return (
    <div
      className="wa-stat-card"
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--green-30)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
    >
      <div className="wa-stat-icon-wrap">{icon}</div>
      <div>
        <p className="wa-stat-label">{label}</p>
        <p className="wa-stat-value">
          {value}
          <span className="wa-stat-unit">{unit}</span>
        </p>
      </div>
    </div>
  );
}

/**
 * @param {{ weather: { city: string, temp: number, rainProb: number, windSpeed: number } }} props
 */
export default function WeatherStats({ weather }) {
  const { t } = useTranslation();

  return (
    <section className="wa-stats-section">
      <div className="wa-section-header">
        <p className="wa-section-tag">{t("weather.conditions_tag")}</p>
        <h2 className="wa-section-title">{weather.city}</h2>
      </div>
      <div className="wa-stats-grid">
        <StatCard icon={<IconThermometer />} label={t("weather.temp_label")}  value={weather.temp}      unit="°C"   />
        <StatCard icon={<IconDroplets />}    label={t("weather.rain_label")}  value={weather.rainProb}  unit="%"    />
        <StatCard icon={<IconWind />}        label={t("weather.wind_label")}  value={weather.windSpeed} unit="km/h" />
      </div>
    </section>
  );
}
