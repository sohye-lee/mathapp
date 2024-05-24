'use client';
import Providers from '../providers';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session || !session?.user) router.replace('/login');
  return (
    <div className="w-full flex flex-col items-center">
      <Providers>{children}</Providers>
    </div>
  );
}
