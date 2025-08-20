import { useQuery } from '@tanstack/react-query';
import { searchPrivatePlaces, SearchPayload, PrivatePlace } from '../api/places';

export function usePrivatePlaces(payload: SearchPayload | undefined) {
  return useQuery<PrivatePlace[]>({
    queryKey: ['private-places', payload],
    queryFn: () => searchPrivatePlaces(payload!),
    enabled: !!payload
  });
}
