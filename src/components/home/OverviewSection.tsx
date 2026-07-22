"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DirectionalLineBackground } from "@/components/brand/DirectionalLineBackground";
import { CampaignStructureVisual } from "@/components/brand/CampaignStructureVisual";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { company } from "@/content/company";
import { heroCopy } from "@/content/services";

export function OverviewSection() {
  const reduceMotion = useReducedMotion();
  const animate = reduceMotion === false;

  return (
    <section
      id="overview"
      className="relative scroll-mt-20 overflow-hidden border-b border-border-dark bg-carbon grain lg:scroll-mt-0"
    >
      <DirectionalLineBackground />
      <Container className="relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-6">
          <motion.p
            className="label-caps text-acid-lime"
            initial={animate ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {company.heroEyebrow}
          </motion.p>
          <motion.h1
            className="mt-4 max-w-xl font-display text-[clamp(2.5rem,5vw,4.25rem)] font-semibold tracking-[-0.04em] text-off-white text-balance"
            initial={animate ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            Put your music in front of the{" "}
            <span className="text-acid-lime">right listeners.</span>
          </motion.h1>
          <motion.p
            className="mt-5 max-w-lg text-base leading-relaxed text-soft-grey md:text-lg"
            initial={animate ? { opacity: 0, y: 14 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {heroCopy.description}
          </motion.p>
          <motion.p
            className="mt-3 max-w-lg text-sm leading-relaxed text-soft-grey/80"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.18 }}
          >
            {heroCopy.supporting}
          </motion.p>
          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={animate ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.22 }}
          >
            <PrimaryButton href="#contact">Contact Us</PrimaryButton>
            <SecondaryButton href="#services">Explore Our Services</SecondaryButton>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-6"
          initial={animate ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
        >
          <CampaignStructureVisual />
        </motion.div>
      </Container>
    </section>
  );
}
