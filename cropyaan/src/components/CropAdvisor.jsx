import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  MapPin, Search, Thermometer, Droplets, Wind, CloudRain,
  Sprout, Leaf, AlertTriangle, ChevronRight, ChevronDown,
  RotateCcw, Info, TrendingUp, X, Tractor, Users, Beef, Waves
} from "lucide-react";
import { useCropAdvisor, ADVISOR_STATUS } from "../hooks/useCropAdvisor.js";
import { weatherCodeToEmoji, weatherCodeToLabel } from "../services/weatherService.js";
import "../cssPages/CropAdvisor.css";

// ── Constants ─────────────────────────────────────────────────────────────────
const STEP = { SEARCH:"search", MAP:"map", CONDITIONS:"conditions", INPUTS:"inputs", RESULTS:"results" };
const GREEN = "#22c55e";

// ── Leaflet loader ────────────────────────────────────────────────────────────
let MC = null;
async function loadMap() {
  if (MC) return MC;
  const { MapContainer, TileLayer, Marker, useMapEvents, useMap } = await import("react-leaflet");
  MC = { MapContainer, TileLayer, Marker, useMapEvents, useMap };
  return MC;
}

// ── Shared UI components ──────────────────────────────────────────────────────

function SectionTag({ children }) {
  return <p className="ca-section-tag">{children}</p>;
}

function ConfidenceBadge({ score, label, color }) {
  return (
    <span className="ca-confidence" style={{ background:`${color}18`, color }}>
      <span className="ca-confidence__dot" style={{ background:color }} />
      {label} — {score}%
    </span>
  );
}

function StatCard({ icon: Icon, label, value, unit, sub, accent }) {
  return (
    <div className="card ca-stat-card">
      <div className="ca-stat-card__label-row">
        <Icon size={13} color={accent} />
        <span className="ca-stat-card__label">{label}</span>
      </div>
      <div className="ca-stat-card__value-row">
        <span className="ca-stat-card__value">{value}</span>
        {unit && <span className="ca-stat-card__unit">{unit}</span>}
      </div>
      {sub && <span className="ca-stat-card__sub">{sub}</span>}
    </div>
  );
}

function SeasonBadge({ season }) {
  if (!season) return null;
  const colors = {
    kharif: { bg:"rgba(34,197,94,0.10)",  text:"#16a34a", border:"rgba(34,197,94,0.30)"  },
    rabi:   { bg:"rgba(59,130,246,0.10)", text:"#1d4ed8", border:"rgba(59,130,246,0.30)" },
    zaid:   { bg:"rgba(251,146,60,0.10)", text:"#c2410c", border:"rgba(251,146,60,0.30)" },
  };
  const c = colors[season.season.id] || colors.kharif;
  return (
    <div className="ca-badge" style={{ background:c.bg, border:`1px solid ${c.border}` }}>
      <span style={{ fontSize:15 }}>{season.season.emoji}</span>
      <div>
        <div className="ca-badge__label" style={{ color:c.text }}>{season.season.label}</div>
        <div className="ca-badge__sub"   style={{ color:c.text }}>{season.season.months}</div>
      </div>
    </div>
  );
}

function SoilBadge({ soil, t }) {
  if (!soil?.primary) return null;
  return (
    <div className="ca-badge" style={{ background:`${soil.primary.color}15`, border:`1px solid ${soil.primary.color}40` }}>
      <div style={{ width:10, height:10, borderRadius:"50%", background:soil.primary.color, flexShrink:0 }} />
      <div>
        <div className="ca-badge__label" style={{ color:"var(--color-text)" }}>{soil.primary.label}</div>
        <div className="ca-badge__sub"   style={{ color:"var(--color-text-muted)", opacity:1 }}>{t("crop_advisor.soil_type")}</div>
      </div>
    </div>
  );
}

function StepDots({ current }) {
  const steps = [STEP.SEARCH, STEP.MAP, STEP.CONDITIONS, STEP.INPUTS, STEP.RESULTS];
  const idx = steps.indexOf(current);
  return (
    <div className="ca-step-dots">
      {steps.map((s, i) => (
        <div key={s} className="ca-step-dot" style={{
          width: i === idx ? 20 : 6,
          background: i <= idx ? GREEN : "var(--overlay-10)",
        }} />
      ))}
    </div>
  );
}

// ── Map helpers ───────────────────────────────────────────────────────────────

function MapClickHandler({ onMapClick }) {
  if (!MC) return null;
  MC.useMapEvents({ click(e) { onMapClick(e.latlng.lat, e.latlng.lng); } });
  return null;
}

function FlyToLocation({ center }) {
  if (!MC) return null;
  const map = MC.useMap();
  useEffect(() => {
    if (center && map) map.flyTo(center, 11, { duration: 1.0 });
  }, [center?.[0], center?.[1]]);
  return null;
}

// ── CropCard ──────────────────────────────────────────────────────────────────

function CropCard({ result, rank, t }) {
  const [expanded, setExpanded] = useState(false);
  const { crop, score, confidence, reasons, warnings } = result;
  const rankColors = ["#F59E0B", "#94A3B8", "#CD7C3A"];
  const rankLabels = ["1st", "2nd", "3rd"];

  return (
    <div className="card ca-crop-card">
      {/* Header */}
      <div
        className="ca-crop-card__header"
        onClick={() => setExpanded(e => !e)}
        style={{ borderBottom: expanded ? "1px solid var(--overlay-7)" : "none" }}
      >
        <div className="ca-crop-card__rank" style={{ background:`${rankColors[rank]}22`, color:rankColors[rank] }}>
          {rankLabels[rank]}
        </div>

        <div className="ca-crop-card__info">
          <div className="ca-crop-card__name-row">
            <span className="ca-crop-card__emoji">{crop.emoji}</span>
            <span className="ca-crop-card__name">{crop.name}</span>
            <span className="ca-crop-card__category">{crop.category}</span>
          </div>
          <p className="ca-crop-card__desc">{crop.description}</p>
          <ConfidenceBadge {...confidence} score={score} />
        </div>

        <ChevronRight
          size={15}
          className={`ca-crop-card__chevron ${expanded ? "ca-crop-card__chevron--open" : ""}`}
        />
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="ca-crop-card__body">
          {/* Why it fits */}
          <div>
            <div className="ca-why-fits__title">{t("crop_advisor.why_fits")}</div>
            {reasons.map((r, i) => (
              <div key={i} className="ca-why-fits__reason">
                <span className="ca-why-fits__check">✓</span>
                <span>{r.replace(/^✓\s*/, "")}</span>
              </div>
            ))}
          </div>

          {/* Warnings */}
          {warnings.length > 0 && (
            <div className="ca-warnings">
              {warnings.map((w, i) => (
                <div key={i} className="ca-warnings__item">
                  <AlertTriangle size={11} style={{ flexShrink:0, marginTop:1 }} />
                  {w}
                </div>
              ))}
            </div>
          )}

          {/* Crop stats */}
          <div className="ca-crop-stats">
            {[
              { label: t("crop_advisor.water_need"), value: crop.waterRequirement },
              { label: t("crop_advisor.duration"),   value: crop.growthDuration   },
              { label: t("crop_advisor.yield"),       value: crop.yieldPotential   },
            ].map(({ label, value }) => (
              <div key={label} className="ca-crop-stat">
                <div className="ca-crop-stat__label">{label}</div>
                <div className="ca-crop-stat__value">{value}</div>
              </div>
            ))}
          </div>

          {/* Farmer tip */}
          <div className="ca-farmer-tip">
            <div className="ca-farmer-tip__label">{t("crop_advisor.farmer_tip")}</div>
            <div className="ca-farmer-tip__text">{crop.tips}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── FarmInputs ────────────────────────────────────────────────────────────────

function OptionPill({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="ca-option-pill"
      style={{
        border:      `1px solid ${selected ? GREEN : "var(--overlay-10)"}`,
        background:  selected ? "rgba(34,197,94,0.10)" : "var(--overlay-5)",
        color:       selected ? "#16a34a" : "var(--color-text-muted)",
        fontWeight:  selected ? 600 : 300,
      }}
    >
      {label}
    </button>
  );
}

function FarmInputs({ onSubmit, t }) {
  const [water,  setWater]  = useState("");
  const [land,   setLand]   = useState("");
  const [labour, setLabour] = useState("");
  const [cattle, setCattle] = useState("");
  const ready = water && land && labour && cattle;

  const fields = [
    { icon:Waves, label:t("crop_advisor.water_label"),  opts:[t("crop_advisor.water_opt1"), t("crop_advisor.water_opt2"), t("crop_advisor.water_opt3"), t("crop_advisor.water_opt4")],   val:water,  set:setWater  },
    { icon:Leaf,  label:t("crop_advisor.land_label"),   opts:[t("crop_advisor.land_opt1"),  t("crop_advisor.land_opt2"),  t("crop_advisor.land_opt3"),  t("crop_advisor.land_opt4")],    val:land,   set:setLand   },
    { icon:Users, label:t("crop_advisor.labour_label"), opts:[t("crop_advisor.labour_opt1"),t("crop_advisor.labour_opt2"),t("crop_advisor.labour_opt3"),t("crop_advisor.labour_opt4")],  val:labour, set:setLabour },
    { icon:Beef,  label:t("crop_advisor.cattle_label"), opts:[t("crop_advisor.cattle_opt1"),t("crop_advisor.cattle_opt2"),t("crop_advisor.cattle_opt3"),t("crop_advisor.cattle_opt4")],  val:cattle, set:setCattle },
  ];

  return (
    <div className="card ca-farm-card">
      <div>
        <SectionTag>{t("crop_advisor.farm_tag")}</SectionTag>
        <h3 className="ca-farm-title">{t("crop_advisor.farm_title")}</h3>
        <p className="ca-farm-subtitle">{t("crop_advisor.farm_subtitle")}</p>
      </div>

      {fields.map(({ icon: Icon, label, opts, val, set }) => (
        <div key={label}>
          <div className="ca-farm-field-label">
            <Icon size={13} color={GREEN} />
            <span>{label}</span>
          </div>
          <div className="ca-farm-options">
            {opts.map(o => (
              <OptionPill key={o} label={o} selected={val === o} onClick={() => set(o)} />
            ))}
          </div>
        </div>
      ))}

      <button
        disabled={!ready}
        onClick={() => onSubmit({ water, land, labour, cattle })}
        className="ca-btn-submit"
        style={{
          background: ready ? GREEN : "var(--overlay-10)",
          color:      ready ? "#fff" : "var(--color-text-muted)",
          opacity:    ready ? 1 : 0.6,
        }}
      >
        {ready ? t("crop_advisor.submit_ready") : t("crop_advisor.submit_pending")}
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CropAdvisor() {
  const { t } = useTranslation();
  const advisor = useCropAdvisor();
  const searchRef = useRef(null);

  const [step,       setStep]       = useState(STEP.SEARCH);
  const [MapComps,   setMapComps]   = useState(null);
  const [mapCenter,  setMapCenter]  = useState(null);
  const [mapMarker,  setMapMarker]  = useState(null);
  const [farmInputs, setFarmInputs] = useState(null);

  useEffect(() => {
    loadMap().then(comps => { MC = comps; setMapComps(comps); });
  }, []);

  useEffect(() => {
    if (advisor.status === ADVISOR_STATUS.SUCCESS && step === STEP.MAP) setStep(STEP.CONDITIONS);
  }, [advisor.status]);

  function handleSelectLocation(loc) {
    setMapCenter([loc.lat, loc.lng]);
    setMapMarker([loc.lat, loc.lng]);
    setStep(STEP.MAP);
    advisor.selectLocation(loc);
  }

  function handleMapClick(lat, lng) {
    setMapCenter([lat, lng]);
    setMapMarker([lat, lng]);
    advisor.handleMapClick(lat, lng);
  }

  function handleFarmSubmit(inputs) { setFarmInputs(inputs); setStep(STEP.RESULTS); }

  function handleReset() {
    advisor.reset();
    setStep(STEP.SEARCH);
    setMapCenter(null);
    setMapMarker(null);
    setFarmInputs(null);
  }

  const seasonNote = advisor.season?.season?.id
    ? t(`crop_advisor.season_note_${advisor.season.season.id}`)
    : "";

  return (
    <div className="page-root ca-page">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="ca-hero">
        <div className="ca-hero__bg" />
        <div className="ca-hero__inner">
          {/* <p className="ca-hero__tag">{t("crop_advisor.tag")}</p> */}
          <h1 className="ca-hero__title">
            {t("crop_advisor.hero_title1")}{" "}
            <span className="ca-hero__title-accent">{t("crop_advisor.hero_title2")}</span>
          </h1>
          <p className="ca-hero__subtitle">{t("crop_advisor.hero_subtitle")}</p>
        </div>
      </section>

      {/* ── Main ───────────────────────────────────────────────── */}
      <section className="ca-main">
        <div className="ca-main__inner">

          <StepDots current={step} />

          {/* Search bar */}
          <div className="ca-search-wrap">
            <div className="card ca-search-bar">
              <Search size={15} color={GREEN} />
              <input
                ref={searchRef}
                type="text"
                className="ca-search-input"
                placeholder={t("crop_advisor.search_placeholder")}
                value={advisor.searchQuery}
                onChange={e => advisor.handleSearchInput(e.target.value)}
              />
              {advisor.searchQuery && (
                <button className="ca-search-clear" onClick={handleReset}>
                  <X size={13} color="var(--color-text-muted)" />
                </button>
              )}
            </div>

            {/* Suggestions */}
            {advisor.searchResults.length > 0 && (
              <div className="ca-suggestions">
                {advisor.searchResults.map(loc => (
                  <button
                    key={loc.id}
                    className="ca-suggestion-item"
                    onClick={() => handleSelectLocation(loc)}
                  >
                    <MapPin size={13} color={GREEN} />
                    <div>
                      <div className="ca-suggestion-name">{loc.shortName}</div>
                      <div className="ca-suggestion-detail">{loc.displayName?.slice(0, 65)}…</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Map */}
          {(step === STEP.MAP || step === STEP.CONDITIONS || step === STEP.INPUTS || step === STEP.RESULTS) && (
            <div className="card ca-map-wrap">
              {MapComps ? (
                <MapComps.MapContainer
                  center={mapCenter || [20.5937, 78.9629]}
                  zoom={mapCenter ? 10 : 5}
                  style={{ height:"100%", width:"100%" }}
                >
                  <MapComps.TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors"
                  />
                  <MapClickHandler onMapClick={handleMapClick} />
                  <FlyToLocation center={mapCenter} />
                  {mapMarker && <MapComps.Marker position={mapMarker} />}
                </MapComps.MapContainer>
              ) : (
                <div className="ca-map-loading">{t("crop_advisor.map_loading")}</div>
              )}
              {step === STEP.MAP && advisor.status === ADVISOR_STATUS.LOADING && (
                <div className="ca-map-overlay">{t("crop_advisor.fetching")}</div>
              )}
              {step === STEP.MAP && advisor.status === ADVISOR_STATUS.IDLE && (
                <div className="ca-map-overlay" style={{ background:"rgba(0,0,0,0.65)" }}>
                  {t("crop_advisor.map_hint")}
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {advisor.status === ADVISOR_STATUS.ERROR && (
            <div className="ca-error">
              <AlertTriangle size={15} style={{ flexShrink:0 }} />
              {advisor.error}
            </div>
          )}

          {/* Empty state */}
          {step === STEP.SEARCH && !advisor.searchQuery && (
            <div className="ca-empty">
              {/* <div className="ca-empty__emoji">🌱</div> */}
              <h3 className="ca-empty__title">{t("crop_advisor.empty_title")}</h3>
              <p className="ca-empty__subtitle">{t("crop_advisor.empty_subtitle")}</p>
              <div className="ca-empty__examples">
                {["Warangal, Telangana", "Ludhiana, Punjab", "Nashik, Maharashtra", "Coimbatore, Tamil Nadu"].map(loc => (
                  <button
                    key={loc}
                    className="ca-example-btn"
                    onClick={() => { advisor.handleSearchInput(loc); searchRef.current?.focus(); }}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conditions */}
          {(step === STEP.CONDITIONS || step === STEP.INPUTS || step === STEP.RESULTS) && advisor.status === ADVISOR_STATUS.SUCCESS && (
            <div className="ca-stack">

              {/* Location bar */}
              <div className="card rounded-2xl px-5 py-4">
                <div className="ca-location-bar">
                  <div>
                    <div className="ca-location-name">
                      <MapPin size={14} color={GREEN} />
                      <span>{advisor.location?.shortName}</span>
                    </div>
                    <div className="ca-location-coords">
                      {advisor.location?.lat?.toFixed(4)}°N, {advisor.location?.lng?.toFixed(4)}°E
                      {advisor.location?.state ? ` · ${advisor.location.state}` : ""}
                    </div>
                  </div>
                  <button className="ca-btn-secondary" onClick={handleReset}>
                    <RotateCcw size={11} /> {t("crop_advisor.new_search")}
                  </button>
                </div>
              </div>

              {/* Conditions card */}
              <div className="card rounded-2xl p-5">
                <SectionTag>{t("crop_advisor.conditions_tag")}</SectionTag>
                <div className="ca-weather-grid">
                  <StatCard icon={Thermometer} label={t("crop_advisor.temp_label")}
                    value={advisor.weather.current.temperature} unit="°C"
                    sub={`${t("crop_advisor.temp_avg")}: ${advisor.weather.weekly.avgTemp}°C`} accent="#ef4444" />
                  <StatCard icon={CloudRain} label={t("crop_advisor.rain_label")}
                    value={advisor.weather.forEngine.rainfall.toFixed(0)} unit="mm/mo"
                    sub={`${t("crop_advisor.rain_today")}: ${advisor.weather.current.precipitation} mm`} accent="#3b82f6" />
                  <StatCard icon={Droplets} label={t("crop_advisor.humidity_label")}
                    value={advisor.weather.current.humidity} unit="%"
                    sub={weatherCodeToLabel(advisor.weather.current.weatherCode)} accent="#06b6d4" />
                  <StatCard icon={Wind} label={t("crop_advisor.wind_label")}
                    value={advisor.weather.current.windSpeed} unit="km/h"
                    sub={`${weatherCodeToEmoji(advisor.weather.current.weatherCode)} ${weatherCodeToLabel(advisor.weather.current.weatherCode)}`}
                    accent="#64748b" />
                </div>
                <div className="ca-badges-row">
                  <SoilBadge soil={advisor.soil} t={t} />
                  <SeasonBadge season={advisor.season} />
                </div>
                {seasonNote && (
                  <div className="ca-season-note">
                    <Info size={12} style={{ flexShrink:0, marginTop:1 }} />
                    {seasonNote}
                  </div>
                )}
              </div>

              {/* Advisory warning */}
              {advisor.advisory && (
                <div className="ca-advisory">
                  <AlertTriangle size={14} style={{ flexShrink:0, marginTop:1 }} />
                  <span>{advisor.advisory.join(" ")}</span>
                </div>
              )}

              {/* CTA */}
              {step === STEP.CONDITIONS && (
                <button className="ca-btn-cta" onClick={() => setStep(STEP.INPUTS)}>
                  {t("crop_advisor.describe_farm_btn")}
                </button>
              )}
            </div>
          )}

          {/* Farm inputs */}
          {(step === STEP.INPUTS || step === STEP.RESULTS) && (
            <div className="mb-4">
              {step === STEP.INPUTS ? (
                <FarmInputs onSubmit={handleFarmSubmit} t={t} />
              ) : (
                <div className="card ca-farm-collapsed" onClick={() => setStep(STEP.INPUTS)}>
                  <div className="ca-farm-collapsed__left">
                    <Tractor size={14} color={GREEN} />
                    <span className="ca-farm-collapsed__title">{t("crop_advisor.farm_set")}</span>
                    <span className="ca-farm-collapsed__summary">
                      {farmInputs?.water} · {farmInputs?.land} · {farmInputs?.labour}
                    </span>
                  </div>
                  <ChevronDown size={13} color="var(--color-text-muted)" />
                </div>
              )}
            </div>
          )}

          {/* Results */}
          {step === STEP.RESULTS && advisor.recommendations.length > 0 && (
            <div className="ca-stack">
              <div className="card rounded-2xl p-5">
                <SectionTag>{t("crop_advisor.results_tag")}</SectionTag>
                <div className="ca-results-header">
                  <Sprout size={15} color={GREEN} />
                  <span className="ca-results-title">{t("crop_advisor.results_title")}</span>
                  <span className="ca-results-count">
                    {t("crop_advisor.results_top")} {advisor.recommendations.length}
                  </span>
                </div>
                <p className="ca-results-meta">
                  {t("crop_advisor.results_based")} {advisor.season?.season?.label} {t("crop_advisor.results_season")} · {advisor.soil?.primary?.label} · {farmInputs?.water} · {farmInputs?.land}
                </p>
                <div className="ca-crop-list">
                  {advisor.recommendations.map((result, i) => (
                    <CropCard key={result.crop.id} result={result} rank={i} t={t} />
                  ))}
                </div>
              </div>

              {advisor.soil?.all?.length > 1 && (
                <div className="ca-other-soils">
                  <Leaf size={13} style={{ flexShrink:0, marginTop:1 }} color="var(--color-text-muted)" />
                  <span>
                    <strong>{t("crop_advisor.other_soils")}: </strong>
                    {advisor.soil.all.slice(1).map(s => s.label).join(", ")}
                  </span>
                </div>
              )}

              <div className="ca-ml-note">
                <TrendingUp size={12} color="var(--color-text-muted)" />
                {t("crop_advisor.ml_note")} <code>recommendationEngine.js</code>
              </div>

              <button className="ca-btn-start-over" onClick={handleReset}>
                <RotateCcw size={13} /> {t("crop_advisor.start_over")}
              </button>
            </div>
          )}

          {/* No results */}
          {step === STEP.RESULTS && advisor.recommendations.length === 0 && (
            <div className="card ca-no-results">
              <div className="ca-no-results__emoji">🌾</div>
              <p className="ca-no-results__title">{t("crop_advisor.no_results_title")}</p>
              <p className="ca-no-results__sub">{t("crop_advisor.no_results_sub")}</p>
              <button className="ca-btn-try-again" onClick={handleReset}>
                {t("crop_advisor.try_again")}
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}