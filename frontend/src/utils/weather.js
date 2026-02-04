const weatherCodeMap = new Map([
  [0, "Clear sky"],
  [1, "Mainly clear"],
  [2, "Partly cloudy"],
  [3, "Overcast"],
  [45, "Foggy"],
  [48, "Rime fog"],
  [51, "Light drizzle"],
  [53, "Moderate drizzle"],
  [55, "Dense drizzle"],
  [61, "Slight rain"],
  [63, "Rain showers"],
  [65, "Heavy rain"],
  [71, "Light snow"],
  [73, "Snow showers"],
  [75, "Heavy snow"],
  [80, "Rain showers"],
  [81, "Moderate showers"],
  [82, "Violent showers"],
  [95, "Thunderstorm"],
  [96, "Thunderstorm with hail"],
  [99, "Severe thunderstorm"]
]);

export const mapWeatherCode = (code) => weatherCodeMap.get(code) || "Seasonal mix";

export const formatDay = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", { weekday: "short" });

export const formatTime = (dateString) =>
  new Date(dateString).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export const formatHour = (dateString) =>
  new Date(dateString).toLocaleTimeString("en-US", { hour: "numeric" });

export const getUnitLabel = (units) => (units === "imperial" ? "°F" : "°C");
