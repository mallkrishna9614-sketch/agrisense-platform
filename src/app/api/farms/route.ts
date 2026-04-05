import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper to extract user from our MVP token
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

export async function GET(request: Request) {
    const user = getUserFromAuthHeader(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const farms = await prisma.farm.findMany({
            where: { userId: user.userId },
            include: { yields: true, recommendations: true }
        });
        return NextResponse.json(farms);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const user = getUserFromAuthHeader(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await request.json();
        const { name, latitude, longitude, landSizeAcres, soilType } = body;

        const farm = await prisma.farm.create({
            data: {
                userId: user.userId,
                name,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                landSizeAcres: parseFloat(landSizeAcres),
                soilType
            }
        });

        return NextResponse.json(farm, { status: 201 });
    } catch (error) {
        console.error('Create farm error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
