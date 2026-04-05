import axios from 'axios';

// MVP In-memory caching simulating Amazon ElastiCache (Redis)
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function getWeatherData(lat: number, lng: number) {
    // Geohashing simulation: round to 2 decimal places to cluster nearby farms 
    // into the same cache block (~1km resolution) to avoid redundant API hits.
    const cacheKey = `weather_${lat.toFixed(2)}_${lng.toFixed(2)}`;

    const cached = cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
        console.log(`[Weather Cache Hit] Serving data for ${lat}, ${lng}`);
        return cached.data;
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) throw new Error("Weather API Key not configured.");

    try {
        console.log(`[Weather Cache Miss] Fetching data for ${lat}, ${lng} from OpenWeatherMap`);
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);

        const data = {
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            rainfall: response.data.rain?.['1h'] || 0, // Fallback to 0 if no rain
            condition: response.data.weather[0].main
        };

        cache.set(cacheKey, { data, timestamp: Date.now() });
        return data;
    } catch (error: any) {
        console.error("OpenWeather API Error:", error.response?.data || error.message);

        // Fallback data for Hackathon / newly-created API Keys that take 2 hours to activate
        if (error.response?.status === 401) {
            console.log(`[Weather Fallback] Using mock data because API key is unauthorized or inactive.`);
            return {
                temperature: 26.5 + (Math.random() * 5 - 2.5),
                humidity: 65 + (Math.random() * 10 - 5),
                rainfall: 45 + (Math.random() * 20 - 10),
                condition: 'Clear'
            };
        }

        throw new Error('Failed to fetch real-time weather data');
    }
}
