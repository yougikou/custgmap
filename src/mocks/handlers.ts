import { rest } from 'msw';

export const handlers = [
  rest.post('/api/places/search', async (req, res, ctx) => {
    const { center } = await req.json();
    const lat = center.lat;
    const lng = center.lng;
    return res(
      ctx.status(200),
      ctx.json({
        results: [
          { id: '1', name: 'Private Store', lat: lat + 0.001, lng: lng + 0.001, address: '123 Private St' },
          { id: '2', name: 'Private Contractor', lat: lat - 0.001, lng: lng - 0.001, address: '456 Contractor Rd' }
        ]
      })
    );
  })
];
