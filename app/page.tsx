import Image from 'next/image';
import { levels } from './lib/constants';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex max-w-3xl bg-white w-full flex-col items-center justify-between px-5 py-8 rounded-lg">
      <h1 className="text-blue-800 font-medium font-sketch text-center text-2xl mb-8">
        Choose your level
      </h1>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3">
        {levels.map((l) => (
          <Link
            href={`/level${l}`}
            key={l}
            className="flex items-center justify-center p-5 bg-blue-600 hover:bg-emerald-600 text-white font-semibold rounded-lg min-h-[80px] text-3xl"
          >
            {l}
          </Link>
        ))}
      </div>
    </main>
  );
}
