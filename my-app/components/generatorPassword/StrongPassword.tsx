type Strength = "Weak" | "Medium" | "Strong";

interface StrongPasswordProps {
  strength: Strength;
}

const strengthConfig: Record<Strength, { label: string; color: string }> = {
  Weak:   { label: "Weak",   color: "text-red-500"    },
  Medium: { label: "Medium", color: "text-amber-500"  },
  Strong: { label: "Strong", color: "text-teal-500"   },
};

export default function StrongPassword({ strength }: StrongPasswordProps) {
  const { label, color } = strengthConfig[strength];
  return (
    <span className={`text-sm font-semibold ${color}`}>
      {label}
    </span>
  );
}