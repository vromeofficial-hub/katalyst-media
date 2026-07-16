import { ContactSection } from "@/components/home/ContactSection";
import { HashScroll } from "@/components/home/HashScroll";
import { OverviewSection } from "@/components/home/OverviewSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WhatWeDoSection } from "@/components/home/WhatWeDoSection";
import { WhyKatalystSection } from "@/components/home/WhyKatalystSection";
import { WorkSection } from "@/components/home/WorkSection";
import { company } from "@/content/company";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: company.pageTitle,
  description: company.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HashScroll />
      <OverviewSection />
      <WhatWeDoSection />
      <WhyKatalystSection />
      <ProcessSection />
      <WorkSection />
      <ContactSection />
    </>
  );
}
