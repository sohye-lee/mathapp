"use client";
import { createArray, shuffle } from "@/app/lib/func";
import { Play } from "@/types/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import PlayItem from "./play";
import { IconCheck } from "@tabler/icons-react";

export default function GamePage() {
  const path = usePathname();
  const level = path.split("/level")[1];
  const [step, setStep] = useState<number>(0);
  const maxStep = 12;
  const stepArray = createArray(1, maxStep);
  const randomArray = shuffle(createArray(1, maxStep));
  const [plays, setPlays] = useState<Play[]>([]);
  const [result, setResult] = useState<Play[]>([]);

  useEffect(() => {
    const newPlays = randomArray.map<Play>((num, i) => ({
      level: Number(level),
      question: num,
      answer: null,
      correct: null,
    }));
    setPlays(newPlays);
  }, [setPlays]);
  console.log(plays);
  return (
    <div className="bg-white max-w-3xl px-5 py-8 rounded-lg w-full ">
      <div className="flex items-center justify-center gap-2 mb-8">
        {plays.map((p, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 ${
              i == step && "bg-gray-800 text-white"
            }`}
          >
            {p.correct ? <IconCheck width={16} /> : i}
          </div>
        ))}
      </div>
      {plays && (
        <PlayItem setResult={setResult} play={plays[step]} step={step} />
      )}
    </div>
  );
}
