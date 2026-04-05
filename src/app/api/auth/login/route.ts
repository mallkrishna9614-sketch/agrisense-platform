import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

function hashPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || user.passwordHash !== hashPassword(password)) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // MVP Simple Token
        const token = Buffer.from(JSON.stringify({ userId: user.id, role: user.role })).toString('base64');

        return NextResponse.json({
            user: { id: user.id, email: user.email, role: user.role },
            token
        }, { status: 200 });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
