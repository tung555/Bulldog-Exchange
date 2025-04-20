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