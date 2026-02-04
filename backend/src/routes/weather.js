import express from "express";

const router = express.Router();

export const createWeatherRouter = ({ weatherService }) => {
  router.get("/", async (req, res) => {
    const city = req.query.city?.trim();
    const units = req.query.units === "imperial" ? "imperial" : "metric";

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    try {
      const weather = await weatherService.getWeatherByCity(city, units);
      return res.json(weather);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to fetch weather";
      const status = message === "City not found" ? 404 : 500;
      return res.status(status).json({ error: message });
    }
  });

  return router;
};
