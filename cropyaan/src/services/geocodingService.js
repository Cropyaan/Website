/**
 * geocodingService.js
 * Location search and reverse geocoding via Nominatim (OpenStreetMap).
 * No API key required for reasonable usage.
 *
 * Swap GEOCODER_BASE to use OpenCage or Google Maps by changing the
 * parseResult() function and the URL builder.
 */

const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";
const USER_AGENT = "Cropyaan/1.0 (agriculture-advisory-app)";

/**
 * Search for locations by text query.
 * @param {string} query
 * @returns {Promise<LocationResult[]>}
 */
export async function searchLocation(query) {
  if (!query || query.trim().length < 2) return [];

  const params = new URLSearchParams({
    q: query,
    format: "json",
    addressdetails: 1,
    limit: 5,
    countrycodes: "in", // Bias toward India; remove for global
  });

  const response = await fetch(`${NOMINATIM_BASE}/search?${params}`, {
    headers: { "Accept-Language": "en", "User-Agent": USER_AGENT },
  });

  if (!response.ok) throw new Error("Geocoding search failed");

  const results = await response.json();
  return results.map(parseNominatimResult);
}

/**
 * Reverse geocode lat/lng → location info.
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<LocationResult>}
 */
export async function reverseGeocode(lat, lng) {
  const params = new URLSearchParams({
    lat: lat.toFixed(6),
    lon: lng.toFixed(6),
    format: "json",
    addressdetails: 1,
    zoom: 10,
  });

  const response = await fetch(`${NOMINATIM_BASE}/reverse?${params}`, {
    headers: { "Accept-Language": "en", "User-Agent": USER_AGENT },
  });

  if (!response.ok) throw new Error("Reverse geocoding failed");

  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return parseNominatimResult(data);
}

/**
 * Parse a Nominatim result into a clean LocationResult.
 */
function parseNominatimResult(item) {
  const addr = item.address || {};

  // Resolve city-level name
  const city =
    addr.city ||
    addr.town ||
    addr.village ||
    addr.county ||
    addr.district ||
    addr.municipality ||
    "";

  // Resolve state
  const state = addr.state || addr.region || "";

  // Resolve district (important for soil mapping granularity)
  const district = addr.county || addr.district || addr.state_district || "";

  return {
    id: item.place_id,
    displayName: item.display_name,
    shortName: [city, state].filter(Boolean).join(", ") || item.display_name,
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lon),
    city,
    district,
    state,
    country: addr.country || "India",
    countryCode: addr.country_code?.toUpperCase() || "IN",
    // These are used by soil and season engines
    region: state,
    boundingBox: item.boundingbox || null,
  };
}