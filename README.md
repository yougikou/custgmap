# Custom Google Maps App

This project is a React + TypeScript app bootstrapped with Vite. It demonstrates a client side map with a private data source and Google Places search.

## Features
- Set map center by address, map click or draggable marker.
- Private search via `/api/places/search` (mocked with MSW).
- Google Places search (text search).
- Directions from center to selected place (driving, walking, transit).
- View raw result JSON in a modal.

## Tech Stack
- React + TypeScript + Vite
- Google Maps via `@vis.gl/react-google-maps`
- State management with Zustand
- UI with MUI
- Data fetching with React Query
- Validation with Zod
- HTTP with Axios
- Mocking with MSW
- Testing with Vitest + Testing Library

## Setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Create `.env` from example and set Google Maps key
   ```bash
   cp .env.example .env
   ```
3. Run in development
   ```bash
   npm run dev
   ```

## API Contract `/api/places/search`
`POST /api/places/search`
```
{
  center:{lat:number,lng:number,formattedAddress?:string,placeId?:string},
  radiusMeters:number,
  filters?:{ types?:("residence"|"repair_shop"|"store"|"contractor")[] },
  paging?:{page:number,pageSize:number}
}
```
Response:
```
{ results: { id:string,name:string,lat:number,lng:number,address:string }[] }
```

## Tests
- Unit tests: `npm test`
- E2E tests: `npm run test:e2e`

## Acceptance Checklist
- [ ] Center can be set via address input, map click, or dragging marker
- [ ] Private search shows results and fits bounds
- [ ] Clicking result opens panel with directions and select actions
- [ ] Google search returns results and supports directions
- [ ] Selected result JSON displayed in modal
