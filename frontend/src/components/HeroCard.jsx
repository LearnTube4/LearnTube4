import { getUnitLabel } from "../utils/weather.js";

export function HeroCard({ city, country, status, current, units, timezone }) {
  const isLoading = status.state === "loading";
  const isError = status.state === "error";

  return (
    <section className="hero-card">
      <div className="hero-header">
        <div>
          <p className="hero-location">{city || "Search a city"}</p>
          {country && <span className="hero-country">{country}</span>}
          {timezone && <p className="hero-timezone">Timezone · {timezone}</p>}
        </div>
        <div className="hero-tag">Real-time pulse</div>
      </div>

      {isLoading && <p className="status-pill">Loading live conditions...</p>}
      {isError && <p className="status-pill error">{status.error}</p>}

      {current && (
        <div className="hero-body">
          <div className="hero-temp">
            <span>{current.temperature}</span>
            <small>{getUnitLabel(units)}</small>
          </div>
          <div className="hero-summary">
            <p className="hero-description">{current.description}</p>
            <p className="hero-meta">
              Feels like {current.apparent}
              {getUnitLabel(units)} · Humidity {current.humidity}% · Wind {current.wind}
              {units === "metric" ? "km/h" : "mph"}
            </p>
          </div>
        </div>
      )}

      {!current && !isLoading && !isError && (
        <p className="status-pill">Start by searching a city or tap a spotlight location.</p>
      )}
    </section>
  );
}
