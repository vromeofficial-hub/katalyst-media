import { AboutSection } from "@/components/home/AboutSection";
import { AudienceSection } from "@/components/home/AudienceSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HashScroll } from "@/components/home/HashScroll";
import { IntroSection } from "@/components/home/IntroSection";
import { OverviewSection } from "@/components/home/OverviewSection";
import { PaidMediaSection } from "@/components/home/PaidMediaSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhySection } from "@/components/home/WhySection";
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
      <CapabilitiesSection />
      <AudienceSection />
      <WhySection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
