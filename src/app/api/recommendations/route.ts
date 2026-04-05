import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getWeatherData } from '@/lib/weather';

function getUserFromAuthHeader(request: Request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) return null;

    try {
        const token = authHeader.split(' ')[1];
        return JSON.parse(Buffer.from(token, 'base64').toString('ascii'));
    } catch (e) {
        return null;
    }
}

// Mock AI Inference upgraded to handle OpenWeatherMap accurate variables
const mockAIInference = (soilType: string, temperature: number, rainfall: number, humidity: number, season: string) => {
    const matrix: Record<string, any> = {
        'CLAY': { crop: 'RICE', conf: 0.94, profit: 88 },
        'LOAMY': { crop: 'WHEAT', conf: 0.89, profit: 82 },
        'SANDY': { crop: 'GROUNDNUT', conf: 0.87, profit: 75 },
        'SILT': { crop: 'SUGARCANE', conf: 0.85, profit: 92 },
        'PEATY': { crop: 'LEGUMES', conf: 0.82, profit: 68 },
    };

    let base = matrix[soilType] || { crop: 'MAIZE', conf: 0.80, profit: 65 };

    // Real-time weather dynamic adjustments
    if (temperature > 35 && rainfall < 20) {
        base = { crop: 'MILLETS (Drought-Resistant)', conf: 0.95, profit: 90 };
    } else if (rainfall > 100 && humidity > 80) {
        base = { crop: 'PADDY (High Moisture required)', conf: 0.92, profit: 85 };
    } else if (temperature < 15) {
        base = { crop: 'MUSTARD (Cool Climate)', conf: 0.88, profit: 78 };
    }

    return base;
};

export async function POST(request: Request) {
    const user = getUserFromAuthHeader(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await request.json();
        const { farmId, season } = body; // Note: removed manual temp/rainfall imports from client

        if (!farmId || !season) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        const farm = await prisma.farm.findUnique({
            where: { id: farmId, userId: user.userId }
        });

        if (!farm) {
            return NextResponse.json({ error: 'Farm not found' }, { status: 404 });
        }

        // NEW: Fetch live weather securely right here in the backend
        const weatherData = await getWeatherData(farm.latitude, farm.longitude);

        // Call "SageMaker Model" with the securely aggregated data
        const result = mockAIInference(farm.soilType, weatherData.temperature, weatherData.rainfall, weatherData.humidity, season);

        const history = await prisma.recommendationHistory.create({
            data: {
                farmId: farm.id,
                recommendedCrop: result.crop,
                confidenceScore: result.conf,
                profitabilityScore: result.profit,
                season: season
            }
        });

        return NextResponse.json({
            history,
            // We return the weather to the frontend just for visualization purposes
            weatherUsedForInference: weatherData
        }, { status: 201 });

    } catch (error: any) {
        console.error('Recommendation Engine Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
