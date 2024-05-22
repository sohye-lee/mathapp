import db from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignInCredentials } from '@/types/types';

export const POST = async (req: NextRequest) => {
  try {
    const { username, password } = (await req.json()) as SignInCredentials;

    if (!username || !password || username == '' || password == '')
      return NextResponse.json({
        ok: false,
        status: 400,
        message: 'Please check username or password.',
      });

    const user = await db.user.findFirst({
      where: {
        username,
      },
    });

    if (!user)
      return NextResponse.json({
        ok: false,
        message: 'This username already exists.',
      });

    if (!bcrypt.compare(password, user.password))
      return NextResponse.json({
        ok: false,
        message: 'Password do not match.',
      });

    return NextResponse.json({
      ok: true,
      status: 200,
      user,
      message: 'Success!',
    });
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.json({
      ok: false,
      message: 'Something went wrong on the server.',
      status: 500,
    });
  }
};
