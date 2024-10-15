import { z } from "zod";

export const navigatorParamsSchema = z.object({
  sessionId: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const navigatorSchema = z.object({
  sessionId: z.string(),
  location: locationSchema.nullish(),
});
