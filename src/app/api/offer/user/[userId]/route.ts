// app/api/offer/user/[userId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../../mongodb';
import Offer from '@/models/offer';

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const itemId = req.nextUrl.searchParams.get('item_id');

  if (!itemId) {
    return NextResponse.json({ error: 'Missing item_id' }, { status: 400 });
  }

  try {
    await connectMongoDB();

    const existingOffer = await Offer.findOne({
      offerer_id: await params.userId,
      item_id: itemId,
    });

    return NextResponse.json(existingOffer || {});
  } catch (error) {
    console.error('Error checking offer:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
