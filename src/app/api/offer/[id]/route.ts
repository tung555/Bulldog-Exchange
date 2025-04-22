// app/api/offer/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '../../../../../mongodb';
import Offer from '@/models/offer';
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

interface RouteParams {
    params: { id: string };
  }

export async function PUT(req: NextRequest, { params }: RouteParams) {
    const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid offer ID' }, { status: 400 });
  }

  try {
    await connectMongoDB();

    const { status, price } = await req.json();

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const updateFields: any = { status };
    if (price !== undefined) updateFields.price = price;

    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      updateFields, {
        new: true,
      }
    );

    if (!updatedOffer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json(updatedOffer, { status: 200 });
  } catch (error) {
    console.error('Error updating offer status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid offer ID' }, { status: 400 });
  }

  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const offer = await Offer.findById(id);
    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    await Offer.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Offer deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}