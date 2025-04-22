import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import connectMongoDB from '../../../../../mongodb';

export async function POST(req: Request) {
  const { token, password } = await req.json();
  if (!token || !password) return NextResponse.json({ message: 'Missing data' }, { status: 400 });

  try {
    const decoded: any = jwt.verify(token, process.env.RESET_TOKEN_SECRET!);
    await connectMongoDB();

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email: decoded.email }, { password: hashedPassword });

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (err) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }
}
