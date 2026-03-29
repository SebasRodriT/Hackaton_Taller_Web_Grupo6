interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}
export default function Slider({
  value,
  min = 6,
  max = 32,
  onChange,
}: SliderProps) {
  return (
    <div className="w-full">
      <p className="text-sm text-gray-700 mb-3">
        Password Length:{" "}
        <span className="font-semibold text-gray-900">{value}</span>
      </p>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer
          bg-gray-200
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-teal-400
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-white
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:cursor-pointer
          accent-teal-400"
      />
    </div>
  );
}