import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { MongoClient } from 'mongodb';
import { hash } from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = (client as MongoClient).db();
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'User already exists.' }, { status: 409 });
    }
    const hashedPassword = await hash(password, 10);
    await db.collection('users').insertOne({ name, email, hashedPassword, createdAt: new Date() });
    return NextResponse.json({ success: true, message: 'Account created successfully. Please sign in.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create account.' }, { status: 500 });
  }
} 