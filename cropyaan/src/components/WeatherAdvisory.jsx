import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../cssPages/WeatherAdvisory.css";
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold });
    observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); observer.disconnect(); };
  }, [threshold]);
  return [ref, inView];
};

const GrainOverlay = () => (
  <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, opacity: 0.03,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    backgroundSize: "128px 128px" }} />
);

const Separator = () => (
  <div style={{ height: 1, width: "100%", overflow: "hidden" }}>
    <div style={{ background: "var(--sep-grad)", height: "1px" }} />
  </div>
);

const FadeIn = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
};

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const IconThermometer = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  </svg>
);
const IconDroplets = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
  </svg>
);
const IconWind = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
  </svg>
);
const IconAlert = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconLeaf = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const StatCard = ({ icon, label, value, unit }) => (
  <div
    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16, transition: "border-color 0.3s" }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "var(--green-30)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
  >
    <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--green-8)", border: "1px solid rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {icon}
    </div>
    <div>
      <p style={{ color: "rgba(113,113,122,0.9)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6, fontWeight: 500 }}>{label}</p>
      <p style={{ color: "#22c55e", fontSize: "2rem", fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1, textShadow: "0 0 20px var(--green-30)" }}>
        {value}
        <span style={{ fontSize: "1rem", color: "var(--color-text-muted)", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, marginLeft: 4 }}>{unit}</span>
      </p>
    </div>
  </div>
);

const AdvisoryCard = ({ advisory, index }) => {
  const isWarning = advisory.type === "warning";
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, background: isWarning ? "rgba(251,191,36,0.04)" : "var(--green-4)", border: isWarning ? "1px solid rgba(251,191,36,0.18)" : "1px solid var(--green-20)", borderRadius: 12, padding: "16px 20px", animation: `fadeUp 0.6s ease ${index * 0.1}s both` }}>
      <div style={{ marginTop: 2, flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: isWarning ? "rgba(251,191,36,0.1)" : "rgba(34,197,94,0.1)", color: isWarning ? "#fbbf24" : "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isWarning ? <IconAlert /> : <IconLeaf />}
      </div>
      <div>
        <p style={{ color: isWarning ? "#fbbf24" : "#22c55e", fontWeight: 600, fontSize: "0.9rem", marginBottom: 4 }}>{advisory.title}</p>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", lineHeight: 1.7, fontWeight: 300 }}>{advisory.text}</p>
      </div>
    </div>
  );
};

export default function WeatherAdvisory() {
  const { t } = useTranslation();
  const [inputVal, setInputVal] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAdvisory = ({ temp, rainProb, windSpeed }) => {
    const advisories = [];
    if (rainProb > 60) advisories.push({ type: "warning", title: t("weather.adv_rain_title"), text: t("weather.adv_rain_text") });
    if (temp > 35)      advisories.push({ type: "warning", title: t("weather.adv_heat_title"), text: t("weather.adv_heat_text") });
    if (windSpeed > 20) advisories.push({ type: "warning", title: t("weather.adv_wind_title"), text: t("weather.adv_wind_text") });
    if (temp < 10)      advisories.push({ type: "warning", title: t("weather.adv_cold_title"), text: t("weather.adv_cold_text") });
    if (advisories.length === 0) advisories.push({ type: "good", title: t("weather.adv_good_title"), text: t("weather.adv_good_text") });
    return advisories;
  };

  const fetchWeather = async (e) => {
    e.preventDefault();
    const query = inputVal.trim();
    if (!query) return;
    setLoading(true); setError(""); setWeather(null);
    try {
      const geoRes = await axios.get("https://geocoding-api.open-meteo.com/v1/search", { params: { name: query, count: 1 } });
      const result = geoRes.data.results?.[0];
      if (!result) { setError(t("weather.error_not_found")); setLoading(false); return; }
      const { latitude, longitude, name, country } = result;
      const weatherRes = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: { latitude, longitude, current: "temperature_2m,precipitation_probability,wind_speed_10m", wind_speed_unit: "kmh", timezone: "auto" },
      });
      const c = weatherRes.data.current;
      setWeather({ city: `${name}, ${country}`, temp: Math.round(c.temperature_2m), rainProb: c.precipitation_probability ?? 0, windSpeed: Math.round(c.wind_speed_10m) });
    } catch {
      setError(t("weather.error_fetch"));
    } finally {
      setLoading(false);
    }
  };

  const advisories = weather ? getAdvisory(weather) : [];

  return (
    <>
      <GrainOverlay />
      <div style={{ background: "var(--bg-main)", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "var(--color-text)", paddingTop: 100 }}>

        {/* HERO */}
        <section style={{ padding: "60px 24px 50px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.06) 0%, transparent 65%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
            <FadeIn>
              <p style={{ color: "#22c55e", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500, marginBottom: 16 }}>
                {t("weather.hero_tag")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: 20, color: "var(--color-text)" }}>
                {t("weather.hero_title1")}{" "}
                <span style={{ color: "#22c55e", textShadow: "0 0 40px rgba(34,197,94,0.35)" }}>{t("weather.hero_title2")}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.8 }}>
                {t("weather.hero_subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* SEARCH */}
        <section style={{ padding: "48px 24px", maxWidth: 760, margin: "0 auto" }}>
          <FadeIn delay={0.1}>
            <form onSubmit={fetchWeather} style={{ display: "flex", gap: 12 }}>
              <input
                type="text"
                className="wa-input"
                placeholder={t("weather.placeholder")}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                style={{ flex: 1, padding: "14px 18px", borderRadius: 12, border: "1px solid var(--overlay-10)", background: "rgba(255,255,255,0.04)", color: "var(--color-text)", fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, transition: "border-color 0.3s, box-shadow 0.3s" }}
              />
              <button
                type="submit"
                className="wa-btn"
                disabled={loading}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 22px", borderRadius: 12, background: "#22c55e", border: "none", color: "#000", fontWeight: 600, fontSize: "0.85rem", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 0 24px rgba(34,197,94,0.35)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em", transition: "all 0.3s", whiteSpace: "nowrap", opacity: loading ? 0.7 : 1 }}
              >
                <IconSearch />
                {loading ? t("weather.btn_searching") : t("weather.btn_search")}
              </button>
            </form>

            {error && (
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", borderRadius: 10, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <span style={{ color: "#ef4444" }}><IconAlert /></span>
                <p style={{ color: "#fca5a5", fontSize: "0.875rem", fontWeight: 300 }}>{error}</p>
              </div>
            )}

            {loading && (
              <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid rgba(34,197,94,0.15)", borderTopColor: "#22c55e", animation: "spin 0.8s linear infinite" }} />
                <p style={{ color: "rgba(113,113,122,0.8)", fontSize: "0.85rem", fontWeight: 300 }}>{t("weather.loading")}</p>
              </div>
            )}
          </FadeIn>
        </section>

        {/* RESULTS */}
        {weather && (
          <>
            <Separator />
            <section style={{ padding: "52px 24px", maxWidth: 900, margin: "0 auto" }}>
              <FadeIn>
                <p style={{ color: "#22c55e", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500, marginBottom: 8 }}>
                  {t("weather.conditions_tag")}
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "var(--color-text)", marginBottom: 36 }}>
                  {weather.city}
                </h2>
              </FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                <FadeIn delay={0}><StatCard icon={<IconThermometer />} label={t("weather.temp_label")} value={weather.temp} unit="°C" /></FadeIn>
                <FadeIn delay={0.1}><StatCard icon={<IconDroplets />} label={t("weather.rain_label")} value={weather.rainProb} unit="%" /></FadeIn>
                <FadeIn delay={0.2}><StatCard icon={<IconWind />} label={t("weather.wind_label")} value={weather.windSpeed} unit="km/h" /></FadeIn>
              </div>
            </section>

            <Separator />

            <section style={{ padding: "52px 24px 80px", maxWidth: 900, margin: "0 auto" }}>
              <FadeIn>
                <p style={{ color: "#22c55e", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500, marginBottom: 8 }}>
                  {t("weather.advisory_tag")}
                </p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "var(--color-text)", marginBottom: 8 }}>
                  {t("weather.advisory_title")}
                </h2>
                <p style={{ color: "rgba(113,113,122,0.8)", fontSize: "0.85rem", fontWeight: 300, marginBottom: 28 }}>
                  {t("weather.advisory_based")} {weather.city}.
                </p>
              </FadeIn>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {advisories.map((adv, i) => <AdvisoryCard key={i} advisory={adv} index={i} />)}
              </div>

              <FadeIn delay={0.4}>
                <p style={{ marginTop: 36, fontSize: "0.75rem", color: "rgba(113,113,122,0.55)", textAlign: "center", lineHeight: 1.8, fontWeight: 300 }}>
                  {t("weather.footer_note")}
                </p>
              </FadeIn>
            </section>
          </>
        )}
      </div>
    </>
  );
}



