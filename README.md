# LearnTube Weather Suite

A premium full-stack weather platform built for clean enterprise delivery. The stack includes a Node.js/Express API proxying Open-Meteo data and a React + Vite front-end with a modern, human-crafted UI.

## Features
- City-based weather search with real-time conditions.
- Seven-day forecast with rich highlights.
- Hourly "see more" detail rail with precipitation risk.
- Metric/Imperial switching.
- Light/dark mode toggle with persistent preference.
- API caching for faster responses.
- Production-ready Docker and CI setup.

## Tech Stack
- **Frontend:** React, Vite, modern CSS.
- **Backend:** Node.js, Express, Open-Meteo API.
- **DevOps:** Docker, Docker Compose, GitHub Actions.

## Project Structure
```
./backend   # Express API service
./frontend  # React client
```

## Getting Started

### 1) Install dependencies
```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2) Run locally (two terminals)
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

Open http://localhost:5173 to view the app.

### 3) Run tests
```bash
cd backend
npm test

cd ../frontend
npm test
```

## Environment Variables
| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `8080` | API port |
| `WEATHER_TTL_MINUTES` | `15` | Cache TTL for API responses |
| `CORS_ORIGIN` | `*` | Allowed origin |

## Docker Deployment
```bash
docker compose up --build
```
- Frontend: http://localhost:3000
- Backend health: http://localhost:8080/health

## API
`GET /api/weather?city=London&units=metric`

### Response
```json
{
  "location": {
    "name": "London",
    "country": "United Kingdom",
    "latitude": 51.5,
    "longitude": -0.12,
    "timezone": "Europe/London"
  },
  "forecast": {},
  "units": "metric",
  "generatedAt": "2024-07-01T10:00:00.000Z"
}
```

## Production Notes
- The API uses caching for performance and reduced upstream calls.
- The frontend and backend are containerized and can be deployed on any container platform.
- GitHub Actions runs tests for both services.

## License
MIT
