import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  WEATHER_TTL_MINUTES: z.coerce.number().default(15),
  CORS_ORIGIN: z.string().default("*")
});

export const env = envSchema.parse(process.env);
