import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import pinoHttp from "pino-http";
import { env } from "./utils/config.js";
import { createWeatherService } from "./services/weather.js";
import { createWeatherRouter } from "./routes/weather.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(pinoHttp());

const weatherService = createWeatherService({ ttlMinutes: env.WEATHER_TTL_MINUTES });

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/weather", createWeatherRouter({ weatherService }));

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(env.PORT, () => {
  console.log(`Weather API listening on port ${env.PORT}`);
});
