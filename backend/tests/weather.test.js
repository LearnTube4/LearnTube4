import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { createWeatherService } from "../src/services/weather.js";

const mockGeocodeResponse = {
  results: [
    {
      name: "Paris",
      country: "France",
      latitude: 48.8566,
      longitude: 2.3522,
      timezone: "Europe/Paris"
    }
  ]
};

const mockForecastResponse = {
  current: {
    temperature_2m: 18.2,
    apparent_temperature: 17.1,
    relative_humidity_2m: 60,
    wind_speed_10m: 10.2,
    weather_code: 3
  },
  daily: {
    time: ["2024-07-01"],
    temperature_2m_max: [22],
    temperature_2m_min: [14],
    weather_code: [3],
    uv_index_max: [6]
  }
};

let fetchCalls = [];

beforeEach(() => {
  fetchCalls = [];
  global.fetch = async (url) => {
    fetchCalls.push(url.toString());
    if (url.toString().includes("geocoding-api")) {
      return {
        ok: true,
        json: async () => mockGeocodeResponse
      };
    }
    return {
      ok: true,
      json: async () => mockForecastResponse
    };
  };
});

test("returns weather payload with location and forecast", async () => {
  const service = createWeatherService({ ttlMinutes: 30 });
  const payload = await service.getWeatherByCity("Paris", "metric");

  assert.equal(payload.location.name, "Paris");
  assert.equal(payload.location.country, "France");
  assert.equal(payload.units, "metric");
  assert.equal(payload.forecast.current.temperature_2m, 18.2);
});

test("caches responses for identical city and units", async () => {
  const service = createWeatherService({ ttlMinutes: 30 });

  await service.getWeatherByCity("Berlin", "metric");
  assert.equal(fetchCalls.length, 2);

  await service.getWeatherByCity("Berlin", "metric");
  assert.equal(fetchCalls.length, 2);
});
