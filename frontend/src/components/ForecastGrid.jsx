import { mapWeatherCode, getUnitLabel } from "../utils/weather.js";

export function ForecastGrid({ forecast, units }) {
  return (
    <section className="forecast-grid">
      <div className="section-header">
        <h2>7-day outlook</h2>
        <p>Confidence-driven daily temperatures.</p>
      </div>
      <div className="grid">
        {forecast.map((day) => (
          <article key={day.day} className="forecast-card">
            <div>
              <p className="forecast-day">{day.day}</p>
              <p className="forecast-description">{mapWeatherCode(day.code)}</p>
            </div>
            <div className="forecast-temps">
              <span>
                {day.max}
                {getUnitLabel(units)}
              </span>
              <small>
                {day.min}
                {getUnitLabel(units)}
              </small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
