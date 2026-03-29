
interface ListPreferenceProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ListPreference({
  label,
  checked,
  onChange,
}: ListPreferenceProps) {
  return (
    <li className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">

      <span className="text-sm text-gray-700">{label}</span>

      <button
        type="button"
        aria-label={`${label}: ${checked ? "activado" : "desactivado"}`}
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={`
          w-5 h-5 rounded border-2 
          flex items-center justify-center 
          text-white text-xs font-bold leading-none
          transition-colors duration-200
          ${checked ? "bg-teal-400 border-teal-400" : "bg-white border-gray-300"}
        `}
      >
        {checked && <span aria-hidden="true">✓</span>}
      </button>
    </li>
  );
}