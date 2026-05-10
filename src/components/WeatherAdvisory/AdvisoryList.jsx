// ─────────────────────────────────────────────────────────────────────────────
// components/WeatherAdvisory/AdvisoryList.jsx
// All display strings resolved through t() — fully i18n friendly.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { useTranslation } from "react-i18next";

// ── Static config — pure black palette only ───────────────────────────────────
const LEVEL_CONFIG = {
  critical: { barOpacity: 1.0,  dotOpacity: 1.0  },
  high:     { barOpacity: 0.75, dotOpacity: 0.75 },
  medium:   { barOpacity: 0.5,  dotOpacity: 0.5  },
  low:      { barOpacity: 0.28, dotOpacity: 0.28 },
};

// Actions keyed by risk type — values are i18n key suffixes
const ACTION_KEYS = {
  heat_stress:     ["action_heat_1",    "action_heat_2",    "action_heat_3",    "action_heat_4"   ],
  cold_stress:     ["action_cold_1",    "action_cold_2",    "action_cold_3"                       ],
  excess_rain:     ["action_rain_1",    "action_rain_2",    "action_rain_3"                       ],
  drought_risk:    ["action_drought_1", "action_drought_2", "action_drought_3"                    ],
  wind_damage:     ["action_wind_1",    "action_wind_2",    "action_wind_3"                       ],
  fungal_pressure: ["action_fungal_1",  "action_fungal_2",  "action_fungal_3"                     ],
  spray_risk:      ["action_spray_1",   "action_spray_2"                                          ],
};

const ACTION_URGENCY = {
  action_heat_1:    "immediate", action_heat_2:    "today",    action_heat_3:    "today",    action_heat_4:    "ongoing",
  action_cold_1:    "immediate", action_cold_2:    "today",    action_cold_3:    "ongoing",
  action_rain_1:    "immediate", action_rain_2:    "today",    action_rain_3:    "today",
  action_drought_1: "immediate", action_drought_2: "today",    action_drought_3: "planning",
  action_wind_1:    "immediate", action_wind_2:    "today",    action_wind_3:    "today",
  action_fungal_1:  "today",     action_fungal_2:  "today",    action_fungal_3:  "ongoing",
  action_spray_1:   "today",     action_spray_2:   "today",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function buildActions(risks, t) {
  const seen = new Set();
  return risks
    .flatMap((risk) => (ACTION_KEYS[risk.type] ?? []).map((key) => ({ key, urgency: ACTION_URGENCY[key] })))
    .filter(({ key }) => { if (seen.has(key)) return false; seen.add(key); return true; })
    .slice(0, 6)
    .map(({ key, urgency }) => ({ text: t(`weather.${key}`), urgency }));
}

function buildSummary(risks, t) {
  if (risks.length === 0) return t("weather.summary_none");
  const top   = risks[0];
  const extra = risks.length > 1
    ? " " + t("weather.summary_extra", { count: risks.length - 1 })  // ← add leading space
    : "";
  return t("weather.summary_template", {
    prefix:   t(`weather.summary_${top.level}`),
    label:    t(`weather.risk_${top.type}_label`),
    level:    t(`weather.level_${top.level}`),
    severity: top.severity,
    reason:   t(`weather.risk_${top.type}_reason_short`),
    extra,
  });
}

// ── Sub-components ────────────────────────────────────────────────────────────
function SeverityBar({ severity }) {
  return (
    <div className="wa-severity-track">
      <div
        className="wa-severity-fill"
        style={{ width: `${severity}%` }}
      />
    </div>
  );
}

function RiskBanner({ risks, t }) {
  const summary = buildSummary(risks, t);
  return (
    <div className="wa-risk-banner">
      <div className="wa-risk-banner-dot" />
      <p className="wa-risk-banner-text">{summary}</p>
    </div>
  );
}

function RiskCard({ risk, index, t }) {
  const cfg = LEVEL_CONFIG[risk.level] ?? LEVEL_CONFIG.low;
  return (
    <div
      className="wa-risk-card"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="wa-risk-header">
        <div className="wa-risk-title-row">
          <span className="wa-risk-icon">{risk.icon}</span>
          <span className="wa-risk-label">{t(`weather.risk_${risk.type}_label`)}</span>
          <span className="wa-risk-level-badge">
            {t(`weather.level_${risk.level}`)}
          </span>
        </div>
        <div className="wa-risk-severity-row">
          <SeverityBar severity={risk.severity} />
          <span className="wa-risk-severity-num">{risk.severity}%</span>
        </div>
      </div>
      <p className="wa-risk-reason">{t(`weather.risk_${risk.type}_reason`)}</p>
    </div>
  );
}

function ActionItem({ action, index, t }) {
  return (
    <div className="wa-action-item" style={{ animationDelay: `${index * 0.07}s` }}>
      <span className="wa-action-urgency">
        {t(`weather.urgency_${action.urgency}`)}
      </span>
      <p className="wa-action-text">{action.text}</p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AdvisoryList({ risks, city }) {
  const { t } = useTranslation();
  const actions = buildActions(risks, t);

  return (
    <section className="wa-advisory-section">

      <div className="wa-section-header">
        <p className="wa-section-tag">{t("weather.advisory_tag")}</p>
        <h2 className="wa-section-title">{t("weather.advisory_title")}</h2>
        <p className="wa-advisory-subtitle">{t("weather.advisory_based")} {city}.</p>
      </div>

      <RiskBanner risks={risks} t={t} />

      {risks.length > 0 && (
        <>
          <p className="wa-subsection-label">{t("weather.detected_conditions")}</p>
          <div className="wa-advisory-list">
            {risks.map((risk, i) => (
              <RiskCard key={risk.type} risk={risk} index={i} t={t} />
            ))}
          </div>
        </>
      )}

      {actions.length > 0 && (
        <>
          <p className="wa-subsection-label" style={{ marginTop: 40 }}>
            {t("weather.recommended_actions")}
          </p>
          <div className="wa-actions-list">
            {actions.map((action, i) => (
              <ActionItem key={i} action={action} index={i} t={t} />
            ))}
          </div>
        </>
      )}

      <p className="wa-footer-note">{t("weather.footer_note")}</p>
    </section>
  );
}