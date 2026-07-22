import { cn } from "@/lib/utils";
import "./equalizer-wave.css";

type EqualizerWaveProps = {
  className?: string;
};

/** Decorative equalizer — CSS-driven so it keeps pulsing reliably. */
export function EqualizerWave({ className }: EqualizerWaveProps) {
  return (
    <div className={cn("equalizer-wave", className)} aria-hidden="true">
      {Array.from({ length: 7 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}
