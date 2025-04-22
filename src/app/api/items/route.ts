import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../mongodb';
import Item from '@/models/item';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get('uid');

  try {
    await connectMongoDB();
    const query = uid ? { ownerUid: uid } : {};
    const items = await Item.find(query).sort({ createdAt: -1 }); // Sort by latest first
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { ownerUid, title, price, condition, description, imageUrl, position } = await req.json();

    if (!ownerUid || !title || price == null || !condition) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectMongoDB();
    const newItem = await Item.create({
      ownerUid,
      title,
      price,
      condition,
      description,
      imageUrl,
      position,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('POST /api/items error:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
