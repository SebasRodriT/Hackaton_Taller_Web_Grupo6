import { LockIcon, XIcon } from "@phosphor-icons/react";

export default function Icon() {
  return (
    <div className="flex flex-col items-center gap-1">
      <LockIcon size={36} weight="light" color="#2DD4BF" />
      <div className="flex items-center gap-1 border-2 border-gray-900 rounded px-2 py-1">
        {[0, 1, 2, 3].map((i) => (
          <XIcon key={i} size={14} weight="bold" color={i === 1 || i === 3 ? "#000000" : "#2DD4BF"}/>
        ))}
      </div>

    </div>
  );
}