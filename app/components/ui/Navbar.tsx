'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="z-[10000] w-full max-w-[calc(100%-40px)] rounded-[80px] bg-white px-6 py-2 fixed top-[20px] left-[20px] flex items-center justify-between min-h-[50px]">
      <Link
        href="/"
        className="font-medium text-[24px] text-slate-800 font-sketch"
      >
        MathMadly
      </Link>
      <div className="flex items-center gap-5">
        {session && session.user ? (
          <button onClick={() => signOut()} className="cursor-pointer">
            Sign Out
          </button>
        ) : (
          <button onClick={() => signIn('credentials')}>Login</button>
        )}
      </div>
    </div>
  );
}
