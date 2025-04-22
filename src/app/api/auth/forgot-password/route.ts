import { NextResponse } from 'next/server';
import User from '@/models/user';
import connectMongoDB from '../../../../../mongodb';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { email } = await req.json();
  await connectMongoDB();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });

  const token = jwt.sign({ email }, process.env.RESET_TOKEN_SECRET!, { expiresIn: '1h' });

  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME!,
      pass: process.env.EMAIL_PASSWORD!,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });

  return NextResponse.json({ message: 'Reset link sent to your email' });
}
