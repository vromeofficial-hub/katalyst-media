"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroStructureItems } from "@/content/services";
import { cn } from "@/lib/utils";
import "./campaign-structure.css";

export function CampaignStructureVisual({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const animate = reduceMotion === false;

  return (
    <div
      className={cn("campaign-structure", className)}
      aria-label="One release coordinated across five marketing functions"
    >
      <div className="campaign-structure__glow" aria-hidden="true">
        <div className="campaign-structure__neon" />
      </div>

      <div className="campaign-structure__panel">
        <div className="relative">
          <p className="label-caps text-acid-lime">Campaign structure</p>

          <motion.div
            className="mt-4"
            initial={animate ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-off-white">
              One Release.
              <br />
              <span className="text-acid-lime">Coordinated Marketing.</span>
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-soft-grey">
              Five marketing functions coordinated around the same release.
            </p>
          </motion.div>

          <ol className="campaign-structure__list mt-6">
            {heroStructureItems.map((item, index) => (
              <motion.li
                key={item}
                className="campaign-structure__item"
                initial={animate ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: animate ? 0.08 + index * 0.04 : 0,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="campaign-structure__num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="campaign-structure__label">{item}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
