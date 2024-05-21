'use client';
import LoginForm from '@components/forms/LoginForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log('status:', status);

  useEffect(() => {
    session && status == 'authenticated' && router.replace('/');
  }, [router, session, status]);
  return (
    <div className="w-full max-w-xl">
      <LoginForm />
    </div>
  );
}
