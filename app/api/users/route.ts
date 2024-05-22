import db from '@/prisma/db';
import { SignUpCredentials } from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const GET = async (req: NextRequest) => {
  try {
    const users = await db.user.findMany();
    return NextResponse.json({
      ok: true,
      status: 200,
      users,
      message: 'Success',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: 'Failed.',
    });
  }
};
