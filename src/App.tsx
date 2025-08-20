import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Stack,
  Typography,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import Map from './components/Map';
import { useMapStore } from './store/mapStore';
import { searchPrivatePlaces } from './api/places';

const placeTypes = ['residence', 'repair_shop', 'store', 'contractor'] as const;

type GoogleMode = google.maps.TravelMode;

export default function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
  const { center, setCenter, setPlaces, selected, setSelected, setDirections } = useMapStore();
  const [address, setAddress] = useState('');
  const [keyword, setKeyword] = useState('');
  const [gType, setGType] = useState<string>('');
  const [jsonModal, setJsonModal] = useState<any | null>(null);
  const [mode, setMode] = useState<GoogleMode>('DRIVING');
  const [directionInfo, setDirectionInfo] = useState<{ distance: string; duration: string } | null>(null);

  const geocodeAddress = () => {
    if (!address) return;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const loc = results[0].geometry.location;
        setCenter({ lat: loc.lat(), lng: loc.lng() });
      }
    });
  };

  const searchPrivate = async () => {
    if (!center) return;
    const results = await searchPrivatePlaces({ center, radiusMeters: 1000 });
    setPlaces(
      results.map((r) => ({
        id: r.id,
        title: r.name,
        position: { lat: r.lat, lng: r.lng },
        source: 'PRIVATE',
        raw: r
      }))
    );
  };

  const searchGoogle = () => {
    if (!center) return;
    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    );
    service.textSearch(
      {
        location: center,
        radius: 1000,
        query: keyword,
        type: gType as any
      },
      (results) => {
        if (!results) return;
        setPlaces(
          results.map((r) => ({
            id: r.place_id!,
            title: r.name!,
            position: {
              lat: r.geometry!.location!.lat(),
              lng: r.geometry!.location!.lng()
            },
            source: 'GOOGLE',
            raw: r
          }))
        );
      }
    );
  };

  const getDirections = (mode: GoogleMode) => {
    if (!center || !selected) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: center,
        destination: selected.position,
        travelMode: mode
      },
      (result, status) => {
        if (status === 'OK' && result) {
          setDirections(result);
          const leg = result.routes[0].legs[0];
          setDirectionInfo({
            distance: leg.distance?.text || '',
            duration: leg.duration?.text || ''
          });
        }
      }
    );
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField size="small" value={address} onChange={(e) => setAddress(e.target.value)} label="Address" />
            <Button variant="contained" onClick={geocodeAddress}>Geocode</Button>
            <Button variant="contained" onClick={searchPrivate} disabled={!center}>Private Search</Button>
            <TextField size="small" value={keyword} onChange={(e) => setKeyword(e.target.value)} label="Keyword" />
            <TextField size="small" select label="Type" value={gType} onChange={(e) => setGType(e.target.value)}>
              {placeTypes.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
            <Button variant="contained" onClick={searchGoogle} disabled={!center}>Google Search</Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1 }}>
        <Map apiKey={apiKey} />
      </Box>
      {selected && (
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, bgcolor: 'background.paper', p:2 }}>
          <Typography variant="h6">{selected.title}</Typography>
          <Stack direction="row" spacing={1} mt={1}>
            <Button onClick={() => getDirections(mode)}>Get {mode.toLowerCase()} directions</Button>
            <TextField size="small" select label="Mode" value={mode} onChange={(e) => setMode(e.target.value as GoogleMode)}>
              {['DRIVING','WALKING','TRANSIT'].map((m)=> (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </TextField>
            {directionInfo && (
              <Typography>{directionInfo.distance} / {directionInfo.duration}</Typography>
            )}
            <Button onClick={() => setJsonModal(selected.raw)}>Select</Button>
            <Button onClick={() => {setSelected(undefined); setDirections(null); setDirectionInfo(null);}}>Close</Button>
          </Stack>
        </Box>
      )}
      <Dialog open={!!jsonModal} onClose={() => setJsonModal(null)} fullWidth maxWidth="md">
        <DialogTitle>Selected Result</DialogTitle>
        <DialogContent>
          <pre>{JSON.stringify(jsonModal, null, 2)}</pre>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

