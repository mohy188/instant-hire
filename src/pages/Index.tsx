import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ComparisonSection from "@/components/ComparisonSection";

import CategoriesSection from "@/components/CategoriesSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <ComparisonSection />
      <PricingSection />
      <CategoriesSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
