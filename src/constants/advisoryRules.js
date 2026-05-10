// ─────────────────────────────────────────────────────────────────────────────
// constants/advisoryRules.js
// Pure weather-condition rules → detailed weather advisories + crop impact
// insights. No crop profiles or crop-specific recommendations.
//
// Each rule fn receives { temp, rainProb, windSpeed } and returns:
//   { type, title, text } | null
//
// type: "danger" | "warning" | "good"
// ─────────────────────────────────────────────────────────────────────────────

// ── Section 1: Detailed weather condition advisories ─────────────────────────
// These describe the weather itself — what it means for the field environment.

export const WEATHER_ADVISORIES = [

  // Temperature
  ({ temp }) => {
    if (temp >= 42)
      return {
        type: "danger",
        title: "Extreme Heat",
        text: `At ${temp}°C, conditions are dangerously hot. Soil surface temperatures can exceed 55°C, causing rapid moisture evaporation and scorching of exposed root zones. Avoid any field work between 10 AM–4 PM.`,
      };
    if (temp >= 35)
      return {
        type: "warning",
        title: "High Temperature",
        text: `Temperature of ${temp}°C creates significant heat stress in the field. Evapotranspiration rates will be elevated, drying out topsoil faster than usual. Early morning is the safest window for field activities.`,
      };
    if (temp <= 2)
      return {
        type: "danger",
        title: "Near-Freezing Conditions",
        text: `At ${temp}°C, frost formation is likely overnight. Ground-level temperatures can drop below 0°C even when air temp reads just above freezing. Ice crystal formation damages cell tissue in exposed plant material.`,
      };
    if (temp <= 10)
      return {
        type: "warning",
        title: "Cold Conditions",
        text: `At ${temp}°C, biological activity in the soil slows considerably. Microbial decomposition and nutrient cycling stall, reducing available nitrogen and phosphorus uptake — even if fertilizers have been applied.`,
      };
    return {
      type: "good",
      title: "Comfortable Temperature",
      text: `${temp}°C is within a healthy range for field conditions. Soil microbial activity is active, evapotranspiration is manageable, and morning dew will likely dissipate by mid-morning.`,
    };
  },

  // Rainfall probability
  ({ rainProb }) => {
    if (rainProb >= 80)
      return {
        type: "danger",
        title: "Heavy Rainfall Likely",
        text: `${rainProb}% chance of rain indicates near-certain precipitation. Expect potential surface runoff, field waterlogging, and reduced trafficability. Machinery movement may cause deep soil compaction under wet conditions.`,
      };
    if (rainProb >= 55)
      return {
        type: "warning",
        title: "Moderate to High Rain Chance",
        text: `Rain probability at ${rainProb}% — field conditions may deteriorate through the day. Pesticide or fertilizer applications risk wash-off before absorption. Schedule any spraying in the early morning window if rain is expected by afternoon.`,
      };
    if (rainProb <= 10)
      return {
        type: "warning",
        title: "Very Low Rainfall",
        text: `Only ${rainProb}% chance of rain. Dry air combined with sun will accelerate surface soil moisture loss. Sandy or loamy soils may become hydrophobic if the dry spell extends beyond 3–4 days.`,
      };
    return {
      type: "good",
      title: "Rainfall Conditions Stable",
      text: `${rainProb}% rain probability indicates stable conditions without waterlogging risk. Soil moisture should remain consistent — a good day for fertilizer application or light tillage work.`,
    };
  },

  // Wind speed
  ({ windSpeed }) => {
    if (windSpeed >= 55)
      return {
        type: "danger",
        title: "Strong Wind Alert",
        text: `Winds at ${windSpeed} km/h create serious physical hazard in the field. Loose topsoil and mulch will be displaced. Tall or flowering plants face mechanical damage from stem bending and leaf shredding.`,
      };
    if (windSpeed >= 30)
      return {
        type: "warning",
        title: "Elevated Wind Speed",
        text: `At ${windSpeed} km/h, spray drift becomes a significant concern — droplets can travel 15–20 m off-target under these conditions. Wind also increases transpiration in plants, amplifying water demand.`,
      };
    return {
      type: "good",
      title: "Calm Wind Conditions",
      text: `Wind speed of ${windSpeed} km/h is low and steady. Spray drift risk is minimal, making this a suitable window for pesticide or foliar fertilizer application if other conditions permit.`,
    };
  },
];

// ── Section 2: Crop impact insights (weather-driven, not crop-specific) ───────
// Pick the 2–3 most relevant insights based on current conditions.
// Each returns { title, text } or null.

export const CROP_IMPACT_RULES = [

  // Heat + low rain → irrigation urgency
  ({ temp, rainProb }) => {
    if (temp >= 35 && rainProb <= 20)
      return {
        title: "Irrigation Demand Will Spike",
        text: `The combination of ${temp}°C heat and only ${rainProb}% rain probability means soil water reserves will deplete quickly. Most field crops will show visible wilting within 48 hours without supplemental irrigation.`,
      };
    return null;
  },

  // High rain → disease pressure
  ({ rainProb, temp }) => {
    if (rainProb >= 60 && temp >= 20)
      return {
        title: "Fungal Disease Pressure Rising",
        text: `Warm, wet conditions (${temp}°C with ${rainProb}% rain likelihood) create ideal conditions for fungal spread — particularly leaf blight, powdery mildew, and root rot pathogens. Canopy humidity stays elevated long after rain stops.`,
      };
    return null;
  },

  // High wind → pollination disruption
  ({ windSpeed }) => {
    if (windSpeed >= 30)
      return {
        title: "Pollination May Be Disrupted",
        text: `Winds at ${windSpeed} km/h can dislodge pollen before transfer and deter pollinating insects. Crops at flowering stage are especially vulnerable — physical damage to floral structures can reduce fruit and grain set.`,
      };
    return null;
  },

  // Cold → nutrient lockout
  ({ temp }) => {
    if (temp <= 12)
      return {
        title: "Nutrient Uptake Will Slow",
        text: `Below 12°C, root metabolic activity reduces significantly. Phosphorus uptake in particular drops sharply in cold soil — recently applied fertilizers may not be absorbed until temperatures recover.`,
      };
    return null;
  },

  // Near-perfect conditions → positive insight
  ({ temp, rainProb, windSpeed }) => {
    if (temp >= 18 && temp <= 30 && rainProb >= 20 && rainProb <= 55 && windSpeed <= 25)
      return {
        title: "Field Conditions Broadly Favorable",
        text: `Current weather offers a good balance of warmth, moisture outlook, and low wind — conditions that support active root development, efficient nutrient uptake, and productive photosynthesis across most field crops.`,
      };
    return null;
  },

  // High temp + high rain → pest surge
  ({ temp, rainProb }) => {
    if (temp >= 28 && rainProb >= 60)
      return {
        title: "Pest Activity Likely to Increase",
        text: `Hot, humid conditions at ${temp}°C with high rain probability accelerate the life cycle of common pests — aphids, whiteflies, and stem borers can complete an extra generation 30–40% faster. Scout fields frequently.`,
      };
    return null;
  },
];