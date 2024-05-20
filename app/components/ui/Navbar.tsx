'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="w-full max-w-[calc(100%-40px)] rounded-sm bg-white px-5 py-2 fixed top-[20px] left-[20px] flex items-center justify-between min-h-[50px]">
      <Link href="/" className="font-medium text-lg text-slate-800">
        MathMadly
      </Link>
      <div className="flex items-center gap-5">
        {session && session.user && 'Logged In'}
      </div>
    </div>
  );
}
