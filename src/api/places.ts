import axios from 'axios';
import { z } from 'zod';

const placeSchema = z.object({
  id: z.string(),
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  address: z.string()
});

const responseSchema = z.object({
  results: z.array(placeSchema)
});

export type PrivatePlace = z.infer<typeof placeSchema>;

export interface SearchPayload {
  center: { lat: number; lng: number; formattedAddress?: string; placeId?: string };
  radiusMeters: number;
  filters?: { types?: ('residence' | 'repair_shop' | 'store' | 'contractor')[] };
  paging?: { page: number; pageSize: number };
}

export async function searchPrivatePlaces(payload: SearchPayload): Promise<PrivatePlace[]> {
  const res = await axios.post('/api/places/search', payload);
  const data = responseSchema.parse(res.data);
  return data.results;
}
