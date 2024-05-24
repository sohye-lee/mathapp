'use client';
import { createArray } from '@/app/lib/func';
import { Play } from '@/types/types';
import {
  IconArrowLeft,
  IconArrowLeftBar,
  IconArrowUp,
  IconCheck,
  IconEraser,
  IconFreeRights,
  IconSend2,
  IconSignRight,
  IconTrash,
  IconUpload,
} from '@tabler/icons-react';
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface PlayItem {
  play: Play;
  setResult: Dispatch<SetStateAction<Play[]>>;
  step: number;
}

export default function PlayItem({ play, setResult, step }: PlayItem) {
  const keyArray = createArray(1, 9);
  const [answer, setAnswer] = useState<string>('0');
  const [correct, setCorrect] = useState(false);

  const onClick = (e: FormEvent, value: string) => {
    e.preventDefault();
    if (answer != undefined && answer != '0') {
      setAnswer((prev) => prev + value);
    } else {
      setAnswer(value);
    }
  };

  const onDeleteLast = (e: FormEvent) => {
    e.preventDefault();
    const len = answer.length;
    if (len > 1) {
      setAnswer((prev) => prev.slice(0, len - 1));
    } else {
      setAnswer('0');
    }
  };

  if (typeof window != 'undefined') {
    window.addEventListener('keydown', function (e) {
      e.preventDefault();
      if (Number(e.key) >= 0 && Number(e.key) <= 9) {
        if (answer != undefined && answer != '0') {
          setAnswer((prev) => prev + e.key);
        } else {
          setAnswer(e.key);
        }
      }
      console.log(typeof e.key);
    });
  }
  useEffect(() => {}, [setAnswer]);

  return (
    <div className="w-full flex flex-col justify-center gap-5">
      <div className="flex items-center justify-between">
        <span className="text-sm uppercase">Level {play?.level}</span>
        <span className="text-sm uppercase">Question No. {step + 1}</span>
      </div>
      <div className="px-4 py-3 bg-emerald-100 rounded-lg">
        <h2 className="text-4xl font-sketch text-center">
          {play?.level} x {play?.question} = ?
        </h2>
      </div>
      <form className="flex w-full items-stretch gap-3">
        <input value={answer} className="text-center w-full" />
        <button type="submit" className="rounded-md bg-emerald-500">
          <IconArrowUp />
        </button>
      </form>
      <div className="w-full grid grid-cols-3 gap-2">
        {keyArray.map((k) => (
          <div
            className="cursor-pointer bg-slate-800 flex items-center justify-center text-2xl text-white py-4 rounded-lg shadow-md hover:bg-blue-800"
            key={k}
            onClick={(e) => onClick(e, k.toString())}
          >
            {k}
          </div>
        ))}
        <div
          onClick={() => setAnswer('0')}
          className="cursor-pointer bg-gray-500 flex items-center justify-center text-2xl text-white py-4 rounded-lg shadow-md hover:bg-blue-800"
        >
          <IconTrash />
        </div>
        <div className="cursor-pointer bg-slate-800 flex items-center justify-center text-2xl text-white py-4 rounded-lg shadow-md hover:bg-blue-800">
          0
        </div>

        <div
          onClick={onDeleteLast}
          className="cursor-pointer bg-gray-500 flex items-center justify-center text-2xl text-white py-4 rounded-lg shadow-md hover:bg-blue-800"
        >
          <IconArrowLeft />
        </div>
      </div>
    </div>
  );
}
