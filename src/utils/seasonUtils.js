/**
 * seasonUtils.js
 * Determines Indian agricultural season from the current date and region.
 *
 * India's three primary seasons:
 *  - Kharif  : June – October (Monsoon / Rainy)
 *  - Rabi    : November – March (Winter / Cool)
 *  - Zaid    : April – June (Summer / Pre-Kharif)
 *
 * Regional nuances are accounted for (southern states have earlier monsoon onset).
 */

export const SEASONS = {
  kharif: {
    id: "kharif",
    label: "Kharif (Monsoon)",
    emoji: "🌧️",
    months: "June – October",
    color: "#2E7D32",
    description: "Monsoon season — sowing begins with rains, harvest in autumn.",
    bgGradient: "linear-gradient(135deg, #1B5E20, #43A047)",
  },
  rabi: {
    id: "rabi",
    label: "Rabi (Winter)",
    emoji: "❄️",
    months: "November – March",
    color: "#1565C0",
    description: "Cool season — sown post-monsoon, harvested in spring.",
    bgGradient: "linear-gradient(135deg, #0D47A1, #1976D2)",
  },
  zaid: {
    id: "zaid",
    label: "Zaid (Summer)",
    emoji: "☀️",
    months: "April – May",
    color: "#E65100",
    description: "Short summer season between rabi harvest and kharif sowing.",
    bgGradient: "linear-gradient(135deg, #BF360C, #F57C00)",
  },
};

/**
 * Regions with earlier monsoon onset (SW Monsoon hits by late May/early June).
 * These start Kharif slightly earlier than northern India.
 */
const EARLY_MONSOON_STATES = [
  "kerala", "karnataka", "goa", "tamil nadu", "andhra pradesh",
  "odisha", "west bengal", "assam", "meghalaya",
];

/**
 * Get the current agricultural season.
 * @param {string} region - State/region name (optional, for regional adjustment)
 * @param {Date}   date   - Reference date (defaults to now)
 * @returns {{ season: object, month: number, isEarlyMonsoon: boolean }}
 */
export function detectSeason(region = "", date = new Date()) {
  const month = date.getMonth() + 1; // 1–12
  const regionLower = region.toLowerCase();
  const isEarlyMonsoon = EARLY_MONSOON_STATES.some((s) => regionLower.includes(s));

  let seasonId;

  if (isEarlyMonsoon) {
    // Southern / coastal: Kharif starts June (May in Kerala), Rabi from Nov
    if (month >= 6 && month <= 10) seasonId = "kharif";
    else if (month === 5) seasonId = "zaid"; // Kerala May = transition
    else if (month >= 11 || month <= 2) seasonId = "rabi";
    else seasonId = "zaid"; // Mar–Apr = late rabi / pre-kharif
  } else {
    // Northern / central India standard calendar
    if (month >= 6 && month <= 10) seasonId = "kharif";
    else if (month >= 11 || month <= 3) seasonId = "rabi";
    else seasonId = "zaid"; // Apr–May
  }

  return {
    season: SEASONS[seasonId],
    month,
    isEarlyMonsoon,
    year: date.getFullYear(),
  };
}

/**
 * Get a human-readable planting calendar note for the season.
 */
export function getSeasonNote(seasonId, region = "") {
  const notes = {
    kharif: `Sow at the onset of monsoon rains${region ? ` in ${region}` : ""}. Harvest expected Oct–Nov.`,
    rabi: `Sow after monsoon withdrawal (Oct–Nov). Harvest in Feb–Mar with irrigation support.`,
    zaid: `Short summer crop window. Choose fast-maturing, heat-tolerant varieties.`,
  };
  return notes[seasonId] || "";
}