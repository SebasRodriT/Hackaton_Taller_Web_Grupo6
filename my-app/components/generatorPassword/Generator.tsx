"use client";

import { useState, useCallback, useEffect } from "react";
import Icon from "./Icon";
import Password from "./Password";
import StrongPassword from "./StrongPassword";
import Slider from "./Slider";
import ListPreferences from "./ListPreference";

interface Options {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  specialChars: boolean;
}

type Strength = "Weak" | "Medium" | "Strong";

const CHAR_SETS = {
  uppercase:    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase:    "abcdefghijklmnopqrstuvwxyz",
  numbers:      "0123456789",
  specialChars: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(length: number, options: Options): string {
  let pool = "";
  const mandatoryChars: string[] = [];

  (Object.keys(options) as Array<keyof Options>).forEach((key) => {
    if (options[key]) {
      pool += CHAR_SETS[key];
      mandatoryChars.push(randomChar(CHAR_SETS[key]));
    }
  });

  if (!pool) return "";
  const remaining = length - mandatoryChars.length;
  const extra = Array.from({ length: Math.max(0, remaining) }, () =>
    randomChar(pool)
  );

  return shuffle([...mandatoryChars, ...extra]).join("");
}

function randomChar(str: string): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return str[array[0] % str.length];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const j = array[0] % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


function calcStrength(password: string, options: Options): Strength {
  const activeOptions = Object.values(options).filter(Boolean).length;
  if (password.length >= 20 && activeOptions >= 4) return "Strong";
  if (password.length >= 12 && activeOptions >= 3) return "Strong";
  if (password.length >= 10 && activeOptions >= 2) return "Medium";
  if (password.length >= 8)                        return "Medium";
  return "Weak";
}

const OPTION_LABELS: { key: keyof Options; label: string }[] = [
  { key: "uppercase",    label: "Uppercase"         },
  { key: "lowercase",    label: "Lowercase"         },
  { key: "numbers",      label: "Numbers"           },
  { key: "specialChars", label: "Special Characters"},
];

export default function Generator() {
  const [length, setLength]   = useState<number>(10);
  const [options, setOptions] = useState<Options>({
    uppercase:    true,
    lowercase:    true,
    numbers:      true,
    specialChars: false,
  });
  const [password, setPassword] = useState<string>("");
  const [strength, setStrength] = useState<Strength>("Medium");
  const [copied, setCopied]     = useState<boolean>(false);
  const [error, setError]       = useState<string>("");

  const generate = useCallback(() => {
    const hasOption = Object.values(options).some(Boolean);
    if (!hasOption) {
      setError("Debes seleccionar al menos una opción de caracteres.");
      setPassword("");
      return;
    }
    setError("");
    const pwd = generatePassword(length, options);
    setPassword(pwd);
    setStrength(calcStrength(pwd, options));
  }, [length, options]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      setError("No se pudo copiar. Intenta manualmente.");
    }
  };
  const handleOptionChange = (key: keyof Options, value: boolean) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className="h-full w-full bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center gap-6">
            <Icon/>
          <div className="text-center">
            <h1 className="text-xl font-extrabold tracking-widest text-gray-900 uppercase">
              Password Generator
            </h1>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Create strong and secure passwords to keep your account safe online.
            </p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <Password
              password={password}
              copied={copied}
              onRegenerate={generate}
              onCopy={handleCopy}
            />
            {password && (
              <div className="pl-1">
                <StrongPassword strength={strength} />
              </div>
            )}
            {error && (
              <p className="text-xs text-red-500 pl-1">{error}</p>
            )}
          </div>
          <div className="w-full">
            <Slider
              value={length}
              min={6}
              max={32}
              onChange={setLength}
            />
          </div>
          <ul className="w-full divide-y divide-gray-100">
            {OPTION_LABELS.map(({ key, label }) => (
              <ListPreferences
                key={key}
                label={label}
                checked={options[key]}
                onChange={(val:any) => handleOptionChange(key, val)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}