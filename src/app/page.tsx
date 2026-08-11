import { AboutSection } from "@/components/home/AboutSection";
import { AudienceSection } from "@/components/home/AudienceSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HashScroll } from "@/components/home/HashScroll";
import { IntroSection } from "@/components/home/IntroSection";
import { OverviewSection } from "@/components/home/OverviewSection";
import { PaidMediaSection } from "@/components/home/PaidMediaSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesSection } from "@/components/home/ServicesSection";
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
      <IntroSection />
      <ServicesSection />
      <PaidMediaSection />
      <ProcessSection />
      <AudienceSection />
      <WorkSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
