import { ArrowClockwiseIcon, CopyIcon } from "@phosphor-icons/react";

interface PasswordProps {
  password: string;
  copied: boolean;
  onRegenerate: () => void;
  onCopy: () => void;
}

export default function Password({
  password,
  copied,
  onRegenerate,
  onCopy,
}: PasswordProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex items-center flex-1 min-w-0 border border-gray-300 rounded-lg px-4 py-2.5 bg-white gap-3 overflow-hidden">
        <span className="flex-1 min-w-0 text-sm text-gray-800 font-mono tracking-wide truncate">
          {password || "—"}
        </span>
        <button
          type="button"
          onClick={onRegenerate}
          className="text-gray-400 hover:text-teal-500 transition-colors duration-200 shrink-0"
          aria-label="Regenerar contraseña"
        >
          <ArrowClockwiseIcon size={18} />
        </button>
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 shrink-0"
      >
        <CopyIcon size={16} />
        <span>{copied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );
}