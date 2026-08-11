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
      aria-label="One release coordinated into five marketing functions"
    >
      <div className="campaign-structure__glow" aria-hidden="true">
        <div className="campaign-structure__neon" />
      </div>

      <div className="campaign-structure__panel">
        <div
          className="pointer-events-none absolute inset-0 grid-overlay opacity-35"
          aria-hidden="true"
        />

        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-dark pb-3">
            <p className="label-caps text-acid-lime">Campaign structure</p>
            <span className="text-[0.65rem] uppercase tracking-[0.1em] text-muted-grey">
              Release framework
            </span>
          </div>

          <motion.div
            className="campaign-structure__release mt-5"
            initial={animate ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted-grey">
              Release
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold tracking-[-0.02em] text-off-white sm:text-xl">
              One Release. Coordinated Marketing.
            </p>
          </motion.div>

          <div className="campaign-structure__spine" aria-hidden="true">
            <span className="campaign-structure__spine-line" />
            <span className="campaign-structure__spine-node" />
            <span className="campaign-structure__spine-label">
              Coordinated campaign system
            </span>
            <span className="campaign-structure__spine-node" />
            <span className="campaign-structure__spine-line" />
          </div>

          <ul className="campaign-structure__modules">
            {heroStructureItems.map((item, index) => (
              <motion.li
                key={item}
                className="campaign-structure__module"
                initial={animate ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: animate ? 0.1 + index * 0.045 : 0,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="campaign-structure__module-rail" aria-hidden="true" />
                <span className="campaign-structure__module-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="campaign-structure__module-title">{item}</span>
              </motion.li>
            ))}
          </ul>

          <p className="campaign-structure__foot">
            <span className="campaign-structure__foot-dot" aria-hidden="true" />
            One campaign
          </p>
        </div>
      </div>
    </div>
  );
}
