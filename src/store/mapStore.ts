import { create } from 'zustand';

export interface Place {
  id: string;
  position: google.maps.LatLngLiteral;
  title: string;
  source: 'PRIVATE' | 'GOOGLE';
  raw: any;
}

interface MapState {
  center: google.maps.LatLngLiteral | null;
  setCenter: (c: google.maps.LatLngLiteral) => void;
  places: Place[];
  setPlaces: (p: Place[]) => void;
  selected?: Place;
  setSelected: (p?: Place) => void;
  directions: google.maps.DirectionsResult | null;
  setDirections: (d: google.maps.DirectionsResult | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  center: null,
  setCenter: (center) => set({ center }),
  places: [],
  setPlaces: (places) => set({ places }),
  selected: undefined,
  setSelected: (p) => set({ selected: p }),
  directions: null,
  setDirections: (d) => set({ directions: d })
}));
