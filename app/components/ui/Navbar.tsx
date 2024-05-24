'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="z-[10000] w-full max-w-[calc(100%-40px)] rounded-[80px] bg-white px-6 py-2 fixed top-[20px] left-[20px] flex items-center justify-between min-h-[50px] shadow-md">
      <Link
        href="/"
        className="font-medium text-[24px] text-slate-800 font-sketch"
      >
        MathMadly
      </Link>
      <div className="flex items-center gap-5">
        {session && session.user ? (
          <div className="relative">
            <div
              className="w-12 h-12 rounded-full relative overflow-hidden border border-blue-600"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <Image
                src={session?.user?.avatar}
                alt={session?.user?.username}
                fill
              />
            </div>
            {dropdownOpen && (
              <div className="bg-white rounded absolute right-0 top-[130%] min-w-[180px] py-6 px-4 shadow-md flex flex-col gap-3">
                <div className="">
                  Hi,{' '}
                  {session?.user?.firstname && session?.user?.firstname != ''
                    ? session?.user?.firstname
                    : session?.user?.username}
                </div>
                <button onClick={() => signOut()} className="w-full">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => signIn('credentials')}>Login</button>
        )}
      </div>
    </div>
  );
}
