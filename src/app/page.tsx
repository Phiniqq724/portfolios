import AboutSection from "@/components/landing/about";
import CTASection from "@/components/landing/cta";
import ExperienceSection from "@/components/landing/experience";
import HeroSection from "@/components/landing/hero";
import ProjectSection from "@/components/landing/project";
import CertSection from "@/components/landing/cert";
import ArchiveSection from "@/components/landing/archives";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <div className="px-6 flex items-center gap-2">
        <div className="w-full h-0.5 bg-secondary " />
        <p className="text-lg text-secondary">ARCHIVES.</p>
        <div className="w-1/4 h-0.5 bg-secondary " />
      </div>
      {/* <ArchiveSection /> */}
      <ProjectSection />
      <div className="px-6 flex items-center gap-2">
        <div className="w-1/4 h-0.5 bg-secondary " />
        <p className="text-lg text-secondary">CERTIFICATES.</p>
        <div className="w-full h-0.5 bg-secondary " />
      </div>
      <CertSection />
      <div className="px-6 flex items-center gap-2">
        <div className="w-full h-0.5 bg-secondary " />
        <p className="text-lg text-secondary">EXPERIENCES.</p>
        <div className="w-1/4 h-0.5 bg-secondary " />
      </div>
      <ExperienceSection />
      <div className="px-6 flex items-center gap-2">
        <div className="w-1/4 h-0.5 bg-secondary " />
        <p className="text-lg text-secondary">CALL2ACT.</p>
        <div className="w-full h-0.5 bg-secondary " />
      </div>
      <CTASection />
    </>
  );
}
