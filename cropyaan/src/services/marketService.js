const DATA_GOV_BASE = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";
const API_KEY = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";

const CROP_COMMODITY_MAP = {
  rice: "Rice",
  wheat: "Wheat",
  maize: "Maize",
  cotton: "Cotton",
  soybean: "Soybean",
  groundnut: "Groundnut",
  sugarcane: "Sugarcane",
  bajra: "Bajra",
  jowar: "Jowar",
  mustard: "Mustard",
  potato: "Potato",
  sunflower: "Sunflower",
  tomato: "Tomato",
  tea: "Tea",
  coconut: "Coconut",
};

const STATE_NAME_MAP = {
  "kerala": "Keralam",
  "odisha": "Odisha",
  "telangana": "Telangana",
};

function normalizeState(state) {
  const key = (state || "").toLowerCase().trim();
  if (STATE_NAME_MAP[key]) return STATE_NAME_MAP[key];

  const proper = key.replace(/\b\w/g, (c) => c.toUpperCase());
  return proper;
}

export async function fetchMarketPrices(state, cropIds) {
  if (!state || !cropIds || cropIds.length === 0) return {};

  const normState = normalizeState(state);
  const results = {};

  const batchSize = 3;
  for (let i = 0; i < cropIds.length; i += batchSize) {
    const batch = cropIds.slice(i, i + batchSize);
    const promises = batch.map(async (cropId) => {
      const commodity = CROP_COMMODITY_MAP[cropId];
      if (!commodity) {
        results[cropId] = null;
        return;
      }

      try {
        const params = new URLSearchParams({
          "api-key": API_KEY,
          format: "json",
          limit: 5,
          offset: 0,
          "filters[state]": normState,
          "filters[commodity]": commodity,
        });

        const res = await fetch(`${DATA_GOV_BASE}?${params}`);
        if (!res.ok) {
          results[cropId] = null;
          return;
        }

        const data = await res.json();
        const records = data.records || [];

        if (records.length === 0) {
          results[cropId] = null;
          return;
        }

        const prices = records.map((r) => ({
          market: r.market,
          district: r.district,
          date: r.arrival_date,
          minPrice: r.min_price,
          maxPrice: r.max_price,
          modalPrice: r.modal_price,
        }));

        const avgModal = Math.round(
          prices.reduce((s, p) => s + p.modalPrice, 0) / prices.length
        );

        results[cropId] = {
          commodity,
          prices,
          avgModalPrice: avgModal,
          maxModalPrice: Math.max(...prices.map((p) => p.modalPrice)),
          minModalPrice: Math.min(...prices.map((p) => p.modalPrice)),
          marketCount: new Set(prices.map((p) => p.market)).size,
          lastUpdated: records[0]?.arrival_date || null,
        };
      } catch {
        results[cropId] = null;
      }
    });

    await Promise.all(promises);
  }

  return results;
}

export function getMostProfitableCrop(marketData, recommendations) {
  if (!marketData || !recommendations) return null;

  const withPrices = recommendations
    .filter((r) => marketData[r.crop.id]?.avgModalPrice)
    .map((r) => ({
      ...r,
      marketPrice: marketData[r.crop.id].avgModalPrice,
    }))
    .sort((a, b) => b.marketPrice - a.marketPrice);

  return withPrices.length > 0 ? withPrices[0] : null;
}

export function getCropProfitabilityRanking(marketData, recommendations) {
  if (!marketData || !recommendations) return [];

  return recommendations
    .map((r, idx) => ({
      rank: idx + 1,
      ...r,
      marketPrice: marketData[r.crop.id]?.avgModalPrice ?? null,
      marketInfo: marketData[r.crop.id] ?? null,
    }))
    .sort((a, b) => (b.marketPrice ?? 0) - (a.marketPrice ?? 0));
}
