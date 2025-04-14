import Image from "next/image";
import LandingPage from "@/components/LandingPage";
import FeaturePage from "@/components/FeaturePage";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <LandingPage />
      <FeaturePage />
    </div>
  );
}
