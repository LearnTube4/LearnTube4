const GEOCODE_ENDPOINT = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_ENDPOINT = "https://api.open-meteo.com/v1/forecast";

const cache = new Map();

export const createWeatherService = ({ ttlMinutes }) => {
  const ttlMs = ttlMinutes * 60 * 1000;

  const getCacheKey = (city, units) => `${city.toLowerCase()}::${units}`;

  const readCache = (key) => {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > ttlMs) {
      cache.delete(key);
      return null;
    }
    return entry.data;
  };

  const writeCache = (key, data) => {
    cache.set(key, { timestamp: Date.now(), data });
  };

  const fetchJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    return response.json();
  };

  const getCoordinates = async (city) => {
    const url = new URL(GEOCODE_ENDPOINT);
    url.searchParams.set("name", city);
    url.searchParams.set("count", "1");
    url.searchParams.set("language", "en");
    url.searchParams.set("format", "json");

    const data = await fetchJson(url);
    if (!data.results || data.results.length === 0) {
      throw new Error("City not found");
    }

    const [result] = data.results;
    return {
      name: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
      timezone: result.timezone
    };
  };

  const getForecast = async (latitude, longitude, units) => {
    const url = new URL(FORECAST_ENDPOINT);
    url.searchParams.set("latitude", latitude);
    url.searchParams.set("longitude", longitude);
    url.searchParams.set("current", "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code");
    url.searchParams.set("hourly", "temperature_2m,precipitation_probability,weather_code");
    url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,weather_code,uv_index_max,sunrise,sunset");
    url.searchParams.set("forecast_days", "7");
    url.searchParams.set("timezone", "auto");
    if (units === "imperial") {
      url.searchParams.set("temperature_unit", "fahrenheit");
      url.searchParams.set("wind_speed_unit", "mph");
    }

    return fetchJson(url);
  };

  const getWeatherByCity = async (city, units = "metric") => {
    const cacheKey = getCacheKey(city, units);
    const cached = readCache(cacheKey);
    if (cached) return cached;

    const location = await getCoordinates(city);
    const forecast = await getForecast(location.latitude, location.longitude, units);

    const payload = {
      location,
      forecast,
      units,
      generatedAt: new Date().toISOString()
    };

    writeCache(cacheKey, payload);
    return payload;
  };

  return { getWeatherByCity };
};
