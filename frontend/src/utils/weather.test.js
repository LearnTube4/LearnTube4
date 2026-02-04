import { describe, it, expect } from "vitest";
import { formatHour, mapWeatherCode, getUnitLabel } from "./weather.js";

describe("weather utils", () => {
  it("maps weather codes", () => {
    expect(mapWeatherCode(0)).toBe("Clear sky");
    expect(mapWeatherCode(95)).toBe("Thunderstorm");
  });

  it("returns unit labels", () => {
    expect(getUnitLabel("metric")).toBe("°C");
    expect(getUnitLabel("imperial")).toBe("°F");
  });

  it("formats hours", () => {
    expect(formatHour("2024-07-01T13:00:00Z")).toContain("1");
  });
});
