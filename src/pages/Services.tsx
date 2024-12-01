import { HeroSection } from "@/components/services/HeroSection";
import { FeatureGrid } from "@/components/services/FeatureGrid";

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ayurveda-background to-white">
      <HeroSection />
      <FeatureGrid />
    </div>
  );
};

export default Services;