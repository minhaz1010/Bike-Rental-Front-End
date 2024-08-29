import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import HistorySection from "@/components/HistorySection";
import MissionStatement from "@/components/MissionStatement";
import TeamSection from "@/components/TeamSection";

const About = () => {
  return (
    <div className="">
      <AboutSection />
      <MissionStatement />
      <TeamSection />
      <HistorySection />
      <ContactSection />
    </div>
  );
};

export default About;