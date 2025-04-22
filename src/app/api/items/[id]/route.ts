import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../mongodb';
import Item from '@/models/item';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const storeParams = await params;
  const { id } = await storeParams;

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

// PUT update item by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  try {
    await connectMongoDB();
    const updatedItem = await Item.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// DELETE item by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectMongoDB();
    await Item.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
