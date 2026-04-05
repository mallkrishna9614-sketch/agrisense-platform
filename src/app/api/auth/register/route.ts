import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// Minimal JWT-like stateless sim for MVP (Real app should use jsonwebtoken or similar)
function hashPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash: hashPassword(password),
                role: 'FARMER',
            },
        });

        // In a real app we would sign a JWT here. 
        // To keep the MVP dependencies light without external auth libs configured:
        const token = Buffer.from(JSON.stringify({ userId: user.id, role: user.role })).toString('base64');

        return NextResponse.json({
            user: { id: user.id, email: user.email, role: user.role },
            token
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
