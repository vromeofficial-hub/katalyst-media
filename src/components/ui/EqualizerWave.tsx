"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import "./equalizer-wave.css";

/** Base heights + independent pulse timings for the equalizer bars. */
const WAVE_BARS = [
  { height: "28%", duration: 0.85, delay: 0 },
  { height: "55%", duration: 1.05, delay: 0.12 },
  { height: "40%", duration: 0.75, delay: 0.22 },
  { height: "85%", duration: 1.15, delay: 0.05 },
  { height: "48%", duration: 0.95, delay: 0.28 },
  { height: "70%", duration: 1.1, delay: 0.16 },
  { height: "35%", duration: 0.8, delay: 0.32 },
] as const;

type EqualizerWaveProps = {
  className?: string;
};

export function EqualizerWave({ className }: EqualizerWaveProps) {
  const reduceMotion = useReducedMotion();
  const animate = reduceMotion === false;

  return (
    <div className={cn("equalizer-wave", className)} aria-hidden="true">
      {WAVE_BARS.map((bar, index) => (
        <motion.span
          key={index}
          style={{ height: bar.height, originY: 1 }}
          animate={
            animate
              ? {
                  scaleY: [0.45, 1, 0.55, 0.92, 0.45],
                  opacity: [0.4, 0.9, 0.5, 0.8, 0.4],
                }
              : { scaleY: 1, opacity: 0.55 }
          }
          transition={
            animate
              ? {
                  duration: bar.duration,
                  delay: bar.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}
