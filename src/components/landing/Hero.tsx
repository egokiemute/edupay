import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const Hero = () => {
  return (
    <div
      className="relative h-[90vh] w-full bg-cover bg-center flex items-center"
      style={{ backgroundImage: "url('/assets/hero-banner.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45"></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-gray-300 text-lg md:text-2xl mb-2">Welcome</p>
          <h1 className="text-white text-4xl md:text-8xl font-bold mb-6">
            Edupay School Fees Portal
          </h1>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              variant="elevated"
              className={cn(
                "bg-yellow-500 text-black hover:text-black rounded-sm border-transparent hover:border-white hover:bg-white px-12 py-8 text-lg transition-all duration-300 ease-in-out"
              )}
            >
              <Link href="/login">
                <div className="flex items-center">Login</div>
              </Link>
            </Button>
            <Button
              asChild
              variant="elevated"
              className={cn(
                "bg-white text-black hover:text-black rounded-sm border-transparent hover:border-white hover:bg-white px-12 py-8 text-lg transition-all duration-300 ease-in-out"
              )}
            >
              <Link href="/signup">
                <div className="flex items-center">Register</div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
