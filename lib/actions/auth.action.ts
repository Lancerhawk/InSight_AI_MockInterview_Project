'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from '@/lib/mongodb';
import { MongoClient} from 'mongodb';

export async function getCurrentUser(): Promise<User | null> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return null;
  try {
    const client = await clientPromise;
    const db = (client as MongoClient).db();
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) return null;
    return {
      id: user._id?.toString() || '',
      name: user.name,
      email: user.email,
    } as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}