import { getUnitLabel } from "../utils/weather.js";

export function DashboardOverview({ status, current, location, units, generatedAt }) {
  const isReady = status.state === "success" && current;

  return (
    <section className="overview">
      <div className="section-header">
        <h2>Operations overview</h2>
        <p>Snapshot of the latest telemetry.</p>
      </div>
      <div className="overview-grid">
        <article className="overview-card primary">
          <p className="overview-label">Current temperature</p>
          <h3>
            {isReady ? current.temperature : "--"}
            {getUnitLabel(units)}
          </h3>
          <span>{isReady ? current.description : "Waiting for data"}</span>
        </article>
        <article className="overview-card">
          <p className="overview-label">Feels like</p>
          <h3>
            {isReady ? current.apparent : "--"}
            {getUnitLabel(units)}
          </h3>
          <span>Comfort band</span>
        </article>
        <article className="overview-card">
          <p className="overview-label">Wind</p>
          <h3>{isReady ? current.wind : "--"}</h3>
          <span>{units === "metric" ? "km/h" : "mph"}</span>
        </article>
        <article className="overview-card">
          <p className="overview-label">Humidity</p>
          <h3>{isReady ? `${current.humidity}%` : "--"}</h3>
          <span>Relative</span>
        </article>
        <article className="overview-card span">
          <p className="overview-label">Location</p>
          <h3>{location ? `${location.name}, ${location.country}` : "--"}</h3>
          <span>{generatedAt ? `Updated ${new Date(generatedAt).toLocaleString()}` : ""}</span>
        </article>
      </div>
    </section>
  );
}
