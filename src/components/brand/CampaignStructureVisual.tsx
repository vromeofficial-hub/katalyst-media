"use client";

import { motion, useReducedMotion } from "framer-motion";
import { campaignFormats } from "@/content/services";
import { cn } from "@/lib/utils";
import "./campaign-structure.css";

export function CampaignStructureVisual({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  // Keep entrance reveals respectful of reduced motion, but the neon
  // border line always runs — it's the requested visual.
  const animate = reduceMotion === false;

  return (
    <div
      className={cn("campaign-structure", className)}
      aria-label="Illustrative campaign structure showing one track distributed across multiple content placements"
    >
      <div className="campaign-structure__glow" aria-hidden="true">
        <div className="campaign-structure__neon" />
      </div>

      <div className="campaign-structure__panel">
        <div
          className="pointer-events-none absolute inset-0 grid-overlay opacity-40"
          aria-hidden="true"
        />

        <div className="relative space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-dark pb-3">
            <p className="label-caps text-acid-lime">Campaign structure</p>
            <span className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-grey">
              Illustrative campaign structure
            </span>
          </div>

          <motion.div
            className="rounded-[12px] border border-lime-border bg-lime-soft px-4 py-4"
            initial={animate ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-xs uppercase tracking-[0.12em] text-muted-grey">Release</p>
            <p className="mt-1 font-display text-lg font-semibold tracking-[-0.02em] text-off-white">
              One track · Multiple placements
            </p>
          </motion.div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {campaignFormats.map((format, index) => (
              <motion.div
                key={format}
                className="rounded-[10px] border border-border-dark bg-graphite px-3.5 py-3"
                initial={animate ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: animate ? 0.08 + index * 0.04 : 0, duration: 0.4 }}
              >
                <div className="flex items-baseline gap-2">
                  <p className="font-mono text-[0.65rem] tracking-[0.08em] text-acid-lime">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm font-medium text-off-white">{format}</p>
                </div>
                <p className="mt-1 text-xs text-muted-grey">Content placement</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
