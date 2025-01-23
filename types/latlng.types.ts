import { z } from 'zod';

const PositionSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export type PositionLatLng = z.infer<typeof PositionSchema>;
