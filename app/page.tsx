import Image from "next/image";
import LandingPage from "@/components/LandingPage";
import FeaturePage from "@/components/FeaturePage";
import PersonasPage from "@/components/PersonasPage";
import TestimonialsPage from "@/components/TestimonialsPage";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-12">
      <LandingPage />
      <FeaturePage />
      <PersonasPage />
      {/* <TestimonialsPage /> */}
      <Footer />
    </div>
  );
}
