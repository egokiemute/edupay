import Benefits from "@/components/landing/Benefits";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import Testimony from "@/components/landing/Testimony";

export default function Home() {
  return (
    <div className="container w-full">
      <Hero />
      <Benefits />
      <Features />
      <Testimony />
      <div className="flex flex-col items-center justify-center py-30 gap-y-4">
        {/* next section */}
      </div>
    </div>
  );
}
