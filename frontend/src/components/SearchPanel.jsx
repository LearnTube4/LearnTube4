import { useState } from "react";

export function SearchPanel({ city, status, units, spotlightCities, onSubmit, onUnitsChange }) {
  const [value, setValue] = useState(city);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  return (
    <div className="search-panel">
      <form onSubmit={handleSubmit} className="search-form">
        <label htmlFor="city" className="sr-only">
          Search city
        </label>
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Search city"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
        />
        <button type="submit" disabled={status.state === "loading"}>
          {status.state === "loading" ? "Syncing" : "Search"}
        </button>
      </form>
      <div className="toggle-group">
        <button
          type="button"
          className={units === "metric" ? "active" : ""}
          onClick={() => onUnitsChange("metric")}
        >
          °C
        </button>
        <button
          type="button"
          className={units === "imperial" ? "active" : ""}
          onClick={() => onUnitsChange("imperial")}
        >
          °F
        </button>
      </div>
      <div className="spotlight">
        <p>Spotlight cities</p>
        <div className="spotlight-chips">
          {spotlightCities.map((spot) => (
            <button key={spot} type="button" onClick={() => onSubmit(spot)}>
              {spot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
