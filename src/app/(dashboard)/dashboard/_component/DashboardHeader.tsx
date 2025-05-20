"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const DashboardHeader = () => {
  const session = useSession();

  // console.log("session ", session);
  // console.log(user)

  const { data } = session;
  // console.log("name ", data);


  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center md:hidden">
            <Link
              href="/"
              className={cn(
                "pl-6 flex items-center text-3xl font-semibold text-green-800",
                poppins.className
              )}
            >
              <span className="">Edu</span>
              <span className="text-yellow-500">pay</span>
            </Link>
          </div>
          <div></div>
          <div className="flex items-center space-x-4">
            {/* {session?.user && ( */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                Welcome, {data?.user?.name || "User"}
              </span>
            </div>
            {/* )} */}
            <SidebarTrigger className="inline-block md:hidden" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
