import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = getUserFromAuthHeader(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;

        // Find the farm to ensure it belongs to the user
        const farm = await prisma.farm.findUnique({
            where: { id: id }
        });

        if (!farm || farm.userId !== user.userId) {
            return NextResponse.json({ error: 'Not Found or Unauthorized' }, { status: 404 });
        }

        // Delete associated records first due to foreign key constraints
        await prisma.recommendationHistory.deleteMany({
            where: { farmId: id }
        });

        await prisma.historicalYield.deleteMany({
            where: { farmId: id }
        });

        // Finally delete the farm
        await prisma.farm.delete({
            where: { id: id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete farm error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
