"use client";
import { createArray } from "@/app/lib/func";
import { Play } from "@/types/types";
import {
  IconArrowLeft,
  IconArrowLeftBar,
  IconEraser,
  IconTrash,
} from "@tabler/icons-react";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface PlayItem {
  play: Play;
  setResult: Dispatch<SetStateAction<Play[]>>;
  step: number;
}

export default function PlayItem({ play, setResult, step }: PlayItem) {
  const keyArray = createArray(1, 9);
  const [answer, setAnswer] = useState<string>("0");
  const onClick = (e: FormEvent, value: number) => {
    e.preventDefault();
    setAnswer((prev) => {
      if (prev != undefined) return prev + value;
    });
  };
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
      <form>
        <input value={answer} className="text-center" />
      </form>
      <div className="w-full grid grid-cols-3 gap-2">
        {keyArray.map((k) => (
          <div
            className="cursor-pointer bg-slate-800 flex items-center justify-center text-2xl text-white py-4 rounded-lg shadow-md hover:bg-blue-800"
            key={k}
            onClick={(e) => onClick(e, k)}
          >
            {k}
          </div>
        ))}
        <div className="cursor-pointer bg-gray-500 flex items-center justify-center text-2xl text-white py-4 rounded-lg shadow-md hover:bg-blue-800">
          <IconTrash />
        </div>
        <div className="cursor-pointer bg-slate-800 flex items-center justify-center text-2xl text-white py-4 rounded-lg shadow-md hover:bg-blue-800">
          0
        </div>

        <div className="cursor-pointer bg-gray-500 flex items-center justify-center text-2xl text-white py-4 rounded-lg shadow-md hover:bg-blue-800">
          <IconArrowLeft />
        </div>
      </div>
    </div>
  );
}
