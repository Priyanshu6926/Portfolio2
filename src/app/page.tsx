import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import PortfolioLab3D from "@/components/PortfolioLab3D";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen font-sans selection:bg-white selection:text-black">
      <ScrollyCanvas />
      <Projects />
      <PortfolioLab3D />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
