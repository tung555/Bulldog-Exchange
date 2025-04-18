import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Item from '@/models/item';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const storeParams = await params;
  const { id } = storeParams;

  try {
    await connectMongoDB();
    const item = await Item.findById(id);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}
