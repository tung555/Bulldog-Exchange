// app/api/offer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Offer from '@/models/offer';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    
        await connectMongoDB();
    
        const offers = await Offer.find({ owner_id: session.user.id });
    
        return NextResponse.json(offers, { status: 200 });
      } catch (error) {
        console.error('Failed to fetch offers:', error);
        return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
      }
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
