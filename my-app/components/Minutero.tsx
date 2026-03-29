"use client";

import { useEffect, useRef, useState } from "react";

export default function Minutero() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const handleStart = () => {
    if (intervalRef.current !== null) return; // evita múltiples intervalos

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = stop;
    }
  };

  const handleReset = () => {
    handleStop();
    setSeconds(0);
  };

  useEffect(() => {
    return () => {
      handleStop();
    };
  }, []);

  const mins = Math.floor(seconds / 60);
  const seg = seconds % 60;

  return (
    <section className="w-full max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
      <h2 className="text-3xl font-semibold text-slate-900">Minutero</h2>

      <div className="mt-6 text-2xl font-medium text-slate-800">
        {mins} Mins {seg} Seg
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handleStop}
          className="rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"
        >
          Start
        </button>

        <button
          onClick={handleStop}
          className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
        >
          Stop
        </button>

        <button
          onClick={handleReset}
          className="rounded bg-yellow-400 px-4 py-2 font-semibold text-black hover:bg-yellow-500"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
