// src/components/ui/spinner.tsx
interface SpinnerProps {
  size?: string;   // Tailwind size (h-12 w-12)
  color?: string;  // Tailwind color
  thickness?: string; // Tailwind border thickness
}

export function Spinner({
  size = "12",
  color = "blue-500",
  thickness = "4",
}: SpinnerProps) {
  return (
    <div
      className={`
        animate-spin
        rounded-full
        border-${thickness} border-t-transparent
        border-${color}
        h-${size} w-${size}
      `}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
