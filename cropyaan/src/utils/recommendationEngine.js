// /**
//  * recommendationEngine.js
//  * Rule-based crop recommendation engine.
//  *
//  * All user-facing strings are resolved through i18next t() — no hardcoded English.
//  * Pass `t` from useTranslation() into getTopCropRecommendations and getLocationAdvisory.
//  */

// import { CROPS } from "../data/cropDatabase.js";

// /**
//  * Score a single crop against the given agronomic context.
//  *
//  * Scoring breakdown:
//  *   Season match     → 0 or 35 pts (hard filter if 0)
//  *   Soil match       → 0 or 25 pts
//  *   Temperature fit  → 0–20 pts (continuous)
//  *   Rainfall fit     → 0–20 pts (continuous)
//  *
//  * @param {object}   crop    - Crop object from cropDatabase
//  * @param {object}   context - { season, soilId, temperature, rainfall }
//  * @param {Function} t       - i18next translation function
//  */
// function scoreCrop(crop, context, t) {
//   const { season, soilId, temperature, rainfall } = context;
//   let score = 0;
//   const reasons = [];
//   const warnings = [];

//   // ── 1. Season match (HARD requirement — 35 pts) ──────────────────────
//   const seasonMatch = crop.conditions.seasons.includes(season);
//   if (!seasonMatch) {
//     return {
//       score: 0,
//       reasons,
//       warnings: [t("crop_engine.warn_wrong_season", { season: t(`season.${season}`) })],
//     };
//   }
//   score += 35;
//   reasons.push(t("crop_engine.reason_season", { season: t(`season.${season}`) }));

//   // ── 2. Soil match (25 pts) ────────────────────────────────────────────
//   const soilMatch = crop.conditions.soilTypes.includes(soilId);
//   if (soilMatch) {
//     score += 25;
//     reasons.push(t("crop_engine.reason_soil", { soil: t(`soil.${soilId}`) }));
//   } else {
//     warnings.push(t("crop_engine.warn_soil"));
//   }

//   // ── 3. Temperature fit (0–20 pts, continuous) ─────────────────────────
//   const [tMin, tMax] = crop.conditions.tempRange;
//   if (temperature >= tMin && temperature <= tMax) {
//     score += 20;
//     reasons.push(t("crop_engine.reason_temp_ok", { temp: temperature }));
//   } else if (temperature < tMin) {
//     const partial = Math.max(0, 20 - (tMin - temperature) * 2);
//     score += partial;
//     if (partial > 0) reasons.push(t("crop_engine.reason_temp_low_partial"));
//     warnings.push(t("crop_engine.warn_temp_low", { min: tMin }));
//   } else {
//     const partial = Math.max(0, 20 - (temperature - tMax) * 2);
//     score += partial;
//     if (partial > 0) reasons.push(t("crop_engine.reason_temp_high_partial"));
//     warnings.push(t("crop_engine.warn_temp_high", { max: tMax }));
//   }

//   // ── 4. Rainfall fit (0–20 pts, continuous) ───────────────────────────
//   const [rMin, rMax] = crop.conditions.rainfallRange;
//   if (rainfall >= rMin && rainfall <= rMax) {
//     score += 20;
//     reasons.push(t("crop_engine.reason_rain_ok", { rain: rainfall.toFixed(1) }));
//   } else if (rainfall < rMin) {
//     const partial = Math.max(0, 20 - (rMin - rainfall) * 0.5);
//     score += partial;
//     if (partial > 0) reasons.push(t("crop_engine.reason_rain_low_partial"));
//     warnings.push(t("crop_engine.warn_rain_low"));
//   } else {
//     const partial = Math.max(0, 20 - (rainfall - rMax) * 0.3);
//     score += partial;
//     if (partial > 0) reasons.push(t("crop_engine.reason_rain_high_partial"));
//     warnings.push(t("crop_engine.warn_rain_high"));
//   }

//   return { score: Math.round(score), reasons, warnings };
// }

// /**
//  * Confidence label from numeric score.
//  * @param {number}   score
//  * @param {Function} t - i18next translation function
//  */
// function confidenceLabel(score, t) {
//   if (score >= 85) return { label: t("crop_advisor.confidence_excellent"), color: "#2E7D32" };
//   if (score >= 70) return { label: t("crop_advisor.confidence_good"),      color: "#558B2F" };
//   if (score >= 55) return { label: t("crop_advisor.confidence_fair"),      color: "#F57F17" };
//   return             { label: t("crop_advisor.confidence_marginal"),        color: "#BF360C" };
// }

// /**
//  * Main recommendation function.
//  *
//  * @param {object}   params
//  * @param {string}   params.season      - "kharif" | "rabi" | "zaid"
//  * @param {string}   params.soilId      - Soil type ID from soilData
//  * @param {number}   params.temperature - Current temperature in °C
//  * @param {number}   params.rainfall    - Monthly rainfall in mm
//  * @param {number}   params.topN        - Number of recommendations (default 3)
//  * @param {Function} params.t           - i18next translation function
//  *
//  * @returns {Array<{ crop, score, confidence, reasons, warnings }>}
//  */
// export function getTopCropRecommendations({ season, soilId, temperature, rainfall, topN = 3, t }) {
//   const context = { season, soilId, temperature, rainfall };

//   const scored = CROPS
//     .map((crop) => {
//       const { score, reasons, warnings } = scoreCrop(crop, context, t);
//       return {
//         crop: { ...crop, whySuitable: reasons },
//         score,
//         confidence: confidenceLabel(score, t),
//         reasons,
//         warnings,
//       };
//     })
//     .filter((r) => r.score > 0)
//     .sort((a, b) => b.score - a.score)
//     .slice(0, topN);

//   return scored;
// }

// /**
//  * Utility: explain why a location might be challenging for farming.
//  *
//  * @param {object}   params
//  * @param {number}   params.temperature
//  * @param {number}   params.rainfall
//  * @param {string}   params.season
//  * @param {Function} params.t - i18next translation function
//  *
//  * @returns {string[] | null}
//  */
// export function getLocationAdvisory({ temperature, rainfall, season, t }) {
//   const advisories = [];
//   if (temperature > 40)                     advisories.push(t("crop_engine.advisory_extreme_heat"));
//   if (temperature < 5)                      advisories.push(t("crop_engine.advisory_extreme_cold"));
//   if (rainfall < 20 && season === "kharif") advisories.push(t("crop_engine.advisory_low_monsoon"));
//   if (rainfall > 300)                       advisories.push(t("crop_engine.advisory_excess_rain"));
//   return advisories.length ? advisories : null;
// }

















/**
 * recommendationEngine.js
 * Rule-based crop recommendation engine.
 *
 * All user-facing strings are resolved through i18next t() — no hardcoded English.
 * Pass `t` from useTranslation() into getTopCropRecommendations and getLocationAdvisory.
 */

import { CROPS } from "../data/cropDatabase.js";

/**
 * Score a single crop against the given agronomic context.
 *
 * Scoring breakdown:
 *   Season match     → 0 or 35 pts (hard filter if 0)
 *   Soil match       → 0 or 25 pts
 *   Temperature fit  → 0–20 pts (continuous)
 *   Rainfall fit     → 0–20 pts (continuous)
 *
 * @param {object}   crop    - Crop object from cropDatabase
 * @param {object}   context - { season, soilId, temperature, rainfall }
 * @param {Function} t       - i18next translation function
 */
function scoreCrop(crop, context, t) {
  const { season, soilId, temperature, rainfall } = context;
  let score = 0;
  const reasons = [];
  const warnings = [];

  // ── 1. Season match (HARD requirement — 35 pts) ──────────────────────
  const seasonMatch = crop.conditions.seasons.includes(season);
  if (!seasonMatch) {
    return {
      score: 0,
      reasons,
      warnings: [t("crop_engine.warn_wrong_season", { season: t(`season.${season}`) })],
    };
  }
  score += 35;
  reasons.push(t("crop_engine.reason_season", { season: t(`season.${season}`) }));

  // ── 2. Soil match (25 pts) ────────────────────────────────────────────
  const soilMatch = crop.conditions.soilTypes.includes(soilId);
  if (soilMatch) {
    score += 25;
    reasons.push(t("crop_engine.reason_soil", { soil: t(`soil.${soilId}`) }));
  } else {
    warnings.push(t("crop_engine.warn_soil"));
  }

  // ── 3. Temperature fit (0–20 pts, continuous) ─────────────────────────
  const [tMin, tMax] = crop.conditions.tempRange;
  if (temperature >= tMin && temperature <= tMax) {
    score += 20;
    reasons.push(t("crop_engine.reason_temp_ok", { temp: temperature }));
  } else if (temperature < tMin) {
    const partial = Math.max(0, 20 - (tMin - temperature) * 2);
    score += partial;
    if (partial > 0) reasons.push(t("crop_engine.reason_temp_low_partial"));
    warnings.push(t("crop_engine.warn_temp_low", { min: tMin }));
  } else {
    const partial = Math.max(0, 20 - (temperature - tMax) * 2);
    score += partial;
    if (partial > 0) reasons.push(t("crop_engine.reason_temp_high_partial"));
    warnings.push(t("crop_engine.warn_temp_high", { max: tMax }));
  }

  // ── 4. Rainfall fit (0–20 pts, continuous) ───────────────────────────
  const [rMin, rMax] = crop.conditions.rainfallRange;
  if (rainfall >= rMin && rainfall <= rMax) {
    score += 20;
    reasons.push(t("crop_engine.reason_rain_ok", { rain: rainfall.toFixed(1) }));
  } else if (rainfall < rMin) {
    const partial = Math.max(0, 20 - (rMin - rainfall) * 0.5);
    score += partial;
    if (partial > 0) reasons.push(t("crop_engine.reason_rain_low_partial"));
    warnings.push(t("crop_engine.warn_rain_low"));
  } else {
    const partial = Math.max(0, 20 - (rainfall - rMax) * 0.3);
    score += partial;
    if (partial > 0) reasons.push(t("crop_engine.reason_rain_high_partial"));
    warnings.push(t("crop_engine.warn_rain_high"));
  }

  return { score: Math.round(score), reasons, warnings };
}

/**
 * Confidence label from numeric score.
 * @param {number}   score
 * @param {Function} t - i18next translation function
 */
function confidenceLabel(score, t) {
  if (score >= 85) return { label: t("crop_advisor.confidence_excellent"), color: "#2E7D32" };
  if (score >= 70) return { label: t("crop_advisor.confidence_good"),      color: "#558B2F" };
  if (score >= 55) return { label: t("crop_advisor.confidence_fair"),      color: "#F57F17" };
  return             { label: t("crop_advisor.confidence_marginal"),        color: "#BF360C" };
}

/**
 * Main recommendation function.
 *
 * @param {object}   params
 * @param {string}   params.season      - "kharif" | "rabi" | "zaid"
 * @param {string}   params.soilId      - Soil type ID from soilData
 * @param {number}   params.temperature - Current temperature in °C
 * @param {number}   params.rainfall    - Monthly rainfall in mm
 * @param {number}   params.topN        - Number of recommendations (default 3)
 * @param {Function} params.t           - i18next translation function
 *
 * @returns {Array<{ crop, score, confidence, reasons, warnings }>}
 */
export function getTopCropRecommendations({ season, soilId, temperature, rainfall, topN = 3, t }) {
  const context = { season, soilId, temperature, rainfall };

  const scored = CROPS
    .map((crop) => {
      const { score, reasons, warnings } = scoreCrop(crop, context, t);
      return {
        crop: { ...crop, whySuitable: reasons },
        score,
        confidence: confidenceLabel(score, t),
        reasons,
        warnings,
      };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return scored;
}

/**
 * Utility: explain why a location might be challenging for farming.
 *
 * @param {object}   params
 * @param {number}   params.temperature
 * @param {number}   params.rainfall
 * @param {string}   params.season
 * @param {Function} params.t - i18next translation function
 *
 * @returns {string[] | null}
 */
export function getLocationAdvisory({ temperature, rainfall, season, t }) {
  const advisories = [];
  if (temperature > 40)                     advisories.push(t("crop_engine.advisory_extreme_heat"));
  if (temperature < 5)                      advisories.push(t("crop_engine.advisory_extreme_cold"));
  if (rainfall < 20 && season === "kharif") advisories.push(t("crop_engine.advisory_low_monsoon"));
  if (rainfall > 300)                       advisories.push(t("crop_engine.advisory_excess_rain"));
  return advisories.length ? advisories : null;
}