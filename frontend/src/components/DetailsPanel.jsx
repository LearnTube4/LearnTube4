import { formatHour, getUnitLabel, mapWeatherCode } from "../utils/weather.js";

export function DetailsPanel({ status, hourly, units }) {
  const show = status.state === "success";

  return (
    <section className="details">
      <div className="section-header">
        <div>
          <h2>See more details</h2>
          <p>Hourly forecast with precipitation risk.</p>
        </div>
        <span className="details-pill">Next 12 hours</span>
      </div>
      <div className="details-grid">
        {show
          ? hourly.map((slot) => (
              <article key={slot.time} className="details-card">
                <p className="details-time">{formatHour(slot.time)}</p>
                <h3>
                  {slot.temperature}
                  {getUnitLabel(units)}
                </h3>
                <p className="details-label">{mapWeatherCode(slot.code)}</p>
                <p className="details-meta">Rain {slot.precipitation ?? 0}%</p>
              </article>
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <article key={index} className="details-card skeleton">
                <p className="details-time">--</p>
                <h3>--</h3>
                <p className="details-label">Loading</p>
              </article>
            ))}
      </div>
    </section>
  );
}
