import { formatTime, getUnitLabel } from "../utils/weather.js";

export function Highlights({ status, current, sunrise, sunset, uvIndex, units }) {
  return (
    <section className="highlights">
      <div className="section-header">
        <h2>Today highlights</h2>
        <p>Decision-ready insights for operations.</p>
      </div>
      <div className="highlight-grid">
        <article className="highlight-card">
          <h3>Feels like</h3>
          <p className="highlight-metric">
            {current ? current.apparent : "--"}
            {getUnitLabel(units)}
          </p>
          <p className="highlight-label">Comfort index</p>
        </article>
        <article className="highlight-card">
          <h3>Humidity</h3>
          <p className="highlight-metric">{current ? `${current.humidity}%` : "--"}</p>
          <p className="highlight-label">Moisture level</p>
        </article>
        <article className="highlight-card">
          <h3>UV index</h3>
          <p className="highlight-metric">{uvIndex ?? "--"}</p>
          <p className="highlight-label">Peak exposure</p>
        </article>
        <article className="highlight-card">
          <h3>Sunrise</h3>
          <p className="highlight-metric">{sunrise ? formatTime(sunrise) : "--"}</p>
          <p className="highlight-label">Sunset {sunset ? formatTime(sunset) : "--"}</p>
        </article>
        <article className="highlight-card accent">
          <h3>Wind speed</h3>
          <p className="highlight-metric">{current ? current.wind : "--"}</p>
          <p className="highlight-label">
            {units === "metric" ? "km/h" : "mph"} sustained
          </p>
        </article>
      </div>
      {status.state === "error" && <p className="status-pill error">{status.error}</p>}
    </section>
  );
}
