import clientPromise from '@/app/utils/db';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, password } = await req.json(); // Use await req.json() to parse the request body

    const client = await clientPromise;
    const db = client.db('dashboard');
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);
    await db.collection('users').insertOne({ name, email, password: hashedPassword });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
