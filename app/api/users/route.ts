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

export const POST = async (req: NextRequest) => {
  try {
    const { username, password, firstname, lastname, level, avatar } =
      (await req.json()) as SignUpCredentials;

    const existingUser = await db.user.findFirst({
      where: { username },
    });

    if (existingUser)
      return NextResponse.json({
        ok: false,
        message: 'User with this username already exists.',
      });

    const user = await db.user.create({
      data: {
        username,
        password: await bcrypt.hash(password, 10),
        avatar,
        firstname,
        lastname,
        level,
      },
    });

    const token = crypto.randomBytes(36).toString('hex');

    return NextResponse.json({
      ok: true,
      status: 200,
      user,
      message: 'Successfully registered!',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: 'Something went wrong on the server.',
    });
  }
};
