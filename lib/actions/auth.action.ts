import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from '@/lib/mongodb';
import { MongoClient, ObjectId } from 'mongodb';

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

export async function getInterviewsByUserId(userId: string) {
  try {
    const client = await clientPromise;
    const db = (client as MongoClient).db();
    const interviews = await db.collection('interviews').find({ userId }).sort({ createdAt: -1 }).toArray();
    return interviews.map((i) => ({ ...i, id: i._id?.toString() }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getLatestInterviews({ userId }: { userId: string }) {
  try {
    const client = await clientPromise;
    const db = (client as MongoClient).db();
    // Example: fetch latest interviews not taken by this user
    const interviews = await db.collection('interviews').find({ userId: { $ne: userId } }).sort({ createdAt: -1 }).limit(10).toArray();
    return interviews.map((i) => ({ ...i, id: i._id?.toString() }));
  } catch (error) {
    console.log(error);
    return [];
  }
}