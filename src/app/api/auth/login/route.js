import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import clientPromise from '@/app/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db('dashboard');
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.NEXT_JWT_SECRET, {
      expiresIn: '1h',
    });

    return NextResponse.json({ token, user }, { status: 200 });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}