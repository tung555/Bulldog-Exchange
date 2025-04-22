// app/api/offer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../mongodb';
import Offer from '@/models/offer';
import Item from '@/models/item';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";




export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = token.id;

  await connectMongoDB();

  const offers = await Offer.find({
    $or: [{ owner_id: userId }, { offerer_id: userId }],
  });

  const entireOffer = await Promise.all(
    offers.map(async (offer) => {
      const item = await Item.findById(offer.item_id);
      return { offer, item };
    })
  );

  return NextResponse.json(entireOffer, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const { offerer_id, offerer_name, owner_id, item_id, title, price, status } = await req.json();

    if (!offerer_id || !offerer_name || price == null || !owner_id || !item_id || !status || title == null) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectMongoDB();
    const newItem = await Offer.create({
      offerer_id,
      offerer_name,
      owner_id,
      item_id,
      title,
      price,
      status,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('POST /api/offer error:', error);
    return NextResponse.json({ error: 'Failed to create offer' }, { status: 500 });
  }
}
