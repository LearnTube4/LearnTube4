import { useEffect, useMemo, useState } from "react";
import { formatDay, mapWeatherCode } from "./utils/weather.js";
import { HeroCard } from "./components/HeroCard.jsx";
import { ForecastGrid } from "./components/ForecastGrid.jsx";
import { Highlights } from "./components/Highlights.jsx";
import { SearchPanel } from "./components/SearchPanel.jsx";
import { DashboardOverview } from "./components/DashboardOverview.jsx";
import { DetailsPanel } from "./components/DetailsPanel.jsx";
import { ThemeToggle } from "./components/ThemeToggle.jsx";
import { defaultCity, spotlightCities } from "./data/cities.js";

const initialStatus = {
  state: "idle",
  error: null
};

export default function App() {
  const [city, setCity] = useState(defaultCity);
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState(initialStatus);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const loadWeather = async (targetCity = city, selectedUnits = units) => {
    if (!targetCity) return;
    setStatus({ state: "loading", error: null });

    try {
      const params = new URLSearchParams({ city: targetCity, units: selectedUnits });
      const response = await fetch(`/api/weather?${params.toString()}`);
      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error || "Unable to fetch weather");
      }
      const data = await response.json();
      setWeather(data);
      setStatus({ state: "success", error: null });
    } catch (error) {
      setStatus({ state: "error", error: error.message });
    }
  };

  const handleSubmit = (nextCity) => {
    setCity(nextCity);
    loadWeather(nextCity, units);
  };

  const handleUnits = (nextUnits) => {
    setUnits(nextUnits);
    if (city) {
      loadWeather(city, nextUnits);
    }
  };

  const current = useMemo(() => {
    if (!weather) return null;
    const { forecast } = weather;
    const description = mapWeatherCode(forecast.current.weather_code);
    return {
      temperature: Math.round(forecast.current.temperature_2m),
      apparent: Math.round(forecast.current.apparent_temperature),
      humidity: forecast.current.relative_humidity_2m,
      wind: Math.round(forecast.current.wind_speed_10m),
      description
    };
  }, [weather]);

  const daily = useMemo(() => {
    if (!weather) return [];
    const { daily } = weather.forecast;
    return daily.time.map((time, index) => ({
      day: formatDay(time),
      max: Math.round(daily.temperature_2m_max[index]),
      min: Math.round(daily.temperature_2m_min[index]),
      code: daily.weather_code[index]
    }));
  }, [weather]);

  const hourly = useMemo(() => {
    if (!weather) return [];
    const { hourly } = weather.forecast;
    return hourly.time.slice(0, 12).map((time, index) => ({
      time,
      temperature: Math.round(hourly.temperature_2m[index]),
      precipitation: hourly.precipitation_probability[index],
      code: hourly.weather_code[index]
    }));
  }, [weather]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">LearnTube Weather Suite</p>
          <h1>Clean, premium forecasts for modern teams.</h1>
          <p className="subtitle">
            Live conditions, seven-day outlooks, and enterprise-grade reliability powered by Open-Meteo.
          </p>
        </div>
        <div className="header-actions">
          <ThemeToggle theme={theme} onToggle={setTheme} />
          <SearchPanel
            city={city}
            status={status}
            units={units}
            spotlightCities={spotlightCities}
            onSubmit={handleSubmit}
            onUnitsChange={handleUnits}
          />
        </div>
      </header>

      <main className="dashboard">
        <HeroCard
          city={weather?.location?.name || city}
          country={weather?.location?.country}
          status={status}
          current={current}
          units={units}
          timezone={weather?.location?.timezone}
        />
        <DashboardOverview
          status={status}
          current={current}
          location={weather?.location}
          units={units}
          generatedAt={weather?.generatedAt}
        />
        <ForecastGrid forecast={daily} units={units} />
        <Highlights
          status={status}
          current={current}
          sunrise={weather?.forecast?.daily?.sunrise?.[0]}
          sunset={weather?.forecast?.daily?.sunset?.[0]}
          uvIndex={weather?.forecast?.daily?.uv_index_max?.[0]}
          units={units}
        />
        <DetailsPanel status={status} hourly={hourly} units={units} />
      </main>
    </div>
  );
}
