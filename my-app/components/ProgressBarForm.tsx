"use client";

import { useId, useState } from "react";

const MIN_PERCENT = 0;
const MAX_PERCENT = 100;

function parsePercent(raw: string): { value: number | null; error: string | null } {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    return { value: null, error: `Ingresa un número entre ${MIN_PERCENT} y ${MAX_PERCENT}.` };
  }

  // Acepta: "50", "50%", "50.5", "50,5"
  const normalized = trimmed.replace(/%\s*$/, "").replace(",", ".");
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    return { value: null, error: "Ingresa un número (puedes usar % al final)." };
  }

  const asNumber = Number(normalized);
  if (Number.isNaN(asNumber)) {
    return { value: null, error: "Valor inválido." };
  }

  const value = Math.round(asNumber);

  if (value < MIN_PERCENT || value > MAX_PERCENT) {
    return { value: null, error: `El valor debe estar entre ${MIN_PERCENT} y ${MAX_PERCENT}.` };
  }

  return { value, error: null };
}

export default function ProgressBarForm() {
  const inputId = useId();
  const [input, setInput] = useState("10");
  const [percent, setPercent] = useState(10);
  const [error, setError] = useState<string | null>(null);

  const badgeLeft = Math.min(95, Math.max(5, percent));

  const applyInput = (raw: string) => {
    const parsed = parsePercent(raw);
    setError(parsed.error);
    if (parsed.value !== null) {
      setPercent(parsed.value);
    }
  };

  return (
    <section className="w-full max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-center text-3xl font-semibold text-slate-900">Progress bar</h2>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">Progreso</p>
          <p className="text-sm font-semibold text-slate-900">{percent}%</p>
        </div>

        {/* Barra visual */}
        <div className="relative mt-2 h-4 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-indigo-500 transition-[width] duration-200"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Semántica accesible */}
        <progress
          className="sr-only"
          value={percent}
          max={MAX_PERCENT}
          aria-label="Progreso"
        />

        <div className="relative mt-3 h-6">
          <span
            className="absolute top-0 inline-flex -translate-x-1/2 items-center rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white"
            style={{ left: `${badgeLeft}%` }}
          >
            {percent}%
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          Input Percentage
        </label>

        <div className="flex items-center gap-3">
          <input
            id={inputId}
            inputMode="numeric"
            value={input}
            onChange={(e) => {
              const next = e.target.value;
              setInput(next);
              setError(parsePercent(next).error);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyInput(input);
              }
            }}
            className="h-10 w-36 rounded-full border border-slate-300 bg-white px-4 text-slate-900 outline-none focus:border-slate-400"
            placeholder="0-100"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
          />

          <button
            type="button"
            onClick={() => applyInput(input)}
            className="h-10 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white"
          >
            Aplicar
          </button>

          <p className="text-sm text-slate-600">Escribe un valor entre 0 y 100.</p>
        </div>

        {error ? (
          <p id={`${inputId}-error`} className="text-sm font-medium text-rose-600">
            {error}
          </p>
        ) : null}
      </div>
    </section>
  );
}
