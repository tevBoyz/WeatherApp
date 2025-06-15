#!/bin/bash

echo "🔐 Injecting OpenWeatherMap API key into Angular build..."

# Inject env var into prod environment file
echo "export const environment = { production: true, openWeatherApiKey: '${OPEN_WEATHER_API_KEY}' };" > src/environments/environment.prod.ts

# Build Angular app
npm run build -- --configuration production
