/**
 * soilData.js
 * Mock soil dataset mapped by Indian state/region.
 * Structured for easy replacement with a real Soil API (e.g., ISRIC SoilGrids).
 * Each entry can carry multiple soil types since regions vary.
 */

export const SOIL_TYPE_META = {
  alluvial: {
    id: "alluvial",
    label: "Alluvial Soil",
    color: "#C8A96E",
    description: "Highly fertile, found in river plains. Rich in potash, phosphoric acid.",
    suitableCrops: ["wheat", "rice", "sugarcane", "maize", "cotton"],
  },
  black: {
    id: "black",
    label: "Black (Regur) Soil",
    color: "#3D3D3D",
    description: "High clay content, moisture-retentive. Ideal for dry-land farming.",
    suitableCrops: ["cotton", "soybean", "sorghum", "sunflower", "wheat"],
  },
  red: {
    id: "red",
    label: "Red Laterite Soil",
    color: "#C0392B",
    description: "Porous, well-drained. Low fertility but responds well to fertilizers.",
    suitableCrops: ["groundnut", "millets", "tobacco", "potato", "maize"],
  },
  laterite: {
    id: "laterite",
    label: "Laterite Soil",
    color: "#E67E22",
    description: "Acidic, leached. Best for plantation crops with proper management.",
    suitableCrops: ["tea", "coffee", "cashew", "rubber", "coconut"],
  },
  sandy: {
    id: "sandy",
    label: "Sandy / Arid Soil",
    color: "#F0D080",
    description: "Low moisture retention. Only drought-resistant crops thrive.",
    suitableCrops: ["groundnut", "bajra", "jowar", "sesame", "moth_bean"],
  },
  forest: {
    id: "forest",
    label: "Forest / Mountain Soil",
    color: "#556B2F",
    description: "Rich in organic matter, slightly acidic. Great for horticulture.",
    suitableCrops: ["apple", "tea", "coffee", "cardamom", "spices"],
  },
  saline: {
    id: "saline",
    label: "Saline / Alkaline Soil",
    color: "#B0A090",
    description: "High salt content. Limited crop options; needs reclamation.",
    suitableCrops: ["barley", "sugarbeet", "cotton", "dhaincha"],
  },
};

/**
 * Region → soil type mapping.
 * Key: lowercase country subdivision name (as returned by geocoders).
 * Value: array of soil type IDs (primary first).
 */
export const REGION_SOIL_MAP = {
  // North India
  "punjab": ["alluvial"],
  "haryana": ["alluvial"],
  "uttar pradesh": ["alluvial"],
  "bihar": ["alluvial"],
  "west bengal": ["alluvial"],
  "assam": ["alluvial", "forest"],
  "delhi": ["alluvial"],
  "uttarakhand": ["forest", "alluvial"],
  "himachal pradesh": ["forest"],
  "jammu and kashmir": ["forest"],
  "ladakh": ["forest"],

  // Central India
  "madhya pradesh": ["black", "red"],
  "maharashtra": ["black", "alluvial"],
  "chhattisgarh": ["red", "alluvial"],

  // South India
  "andhra pradesh": ["red", "black", "alluvial"],
  "telangana": ["red", "black"],
  "karnataka": ["red", "laterite", "black"],
  "tamil nadu": ["red", "alluvial", "black"],
  "kerala": ["laterite", "alluvial"],
  "goa": ["laterite"],

  // East India
  "odisha": ["red", "alluvial"],
  "jharkhand": ["red", "forest"],

  // West / Rajasthan
  "rajasthan": ["sandy", "red"],
  "gujarat": ["black", "alluvial", "sandy"],

  // North East
  "meghalaya": ["forest", "laterite"],
  "nagaland": ["forest"],
  "manipur": ["forest"],
  "mizoram": ["forest"],
  "tripura": ["alluvial", "forest"],
  "arunachal pradesh": ["forest"],
  "sikkim": ["forest"],

  // Default fallback
  default: ["alluvial"],
};

/**
 * Resolve soil types for a given region string.
 * @param {string} region - State or region name from geocoder
 * @returns {{ primary: object, all: object[] }}
 */
export function getSoilForRegion(region) {
  const key = (region || "").toLowerCase().trim();

  // Try exact match first, then partial
  let soilIds = REGION_SOIL_MAP[key];
  if (!soilIds) {
    const matchKey = Object.keys(REGION_SOIL_MAP).find((k) => key.includes(k) || k.includes(key));
    soilIds = matchKey ? REGION_SOIL_MAP[matchKey] : REGION_SOIL_MAP.default;
  }

  const all = soilIds.map((id) => SOIL_TYPE_META[id]).filter(Boolean);
  return {
    primary: all[0] || SOIL_TYPE_META.alluvial,
    all,
  };
}