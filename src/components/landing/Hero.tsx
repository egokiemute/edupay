"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const images = [
  "/assets/hero-banner.jpg",
  "/assets/hero-banner-2.jpg",
];

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Sliding Background Images */}
      <div
        className="absolute inset-0 transition-all duration-1000 bg-cover bg-center"
        style={{ backgroundImage: `url('${images[currentImage]}')` }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
        <div className="max-w-3xl flex flex-col items-center text-center">
          <h1 className="text-white text-4xl md:text-7xl font-bold mb-4">
            Simplify School Fee Payments with Edupay
          </h1>
          <p className="text-gray-300 text-lg md:text-2xl mb-6">
            Your secure, convenient, and efficient fee payment solution for students.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              variant="elevated"
              className={cn(
                "bg-yellow-500 text-black hover:bg-white hover:text-black rounded-sm px-12 py-6 text-lg transition-all"
              )}
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              variant="elevated"
              className={cn(
                "bg-white text-black hover:bg-yellow-500 hover:text-black rounded-sm px-12 py-6 text-lg transition-all"
              )}
            >
              <Link href="/signup">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
