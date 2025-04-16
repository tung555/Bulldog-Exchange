// app/api/listings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Item from '@/models/item';

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    // Fetch latest 12 items, sorted by creation date (newest first)
    const items = await Item.find().sort({ createdAt: -1 }).limit(12);

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch listings:', error);
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
  }
}