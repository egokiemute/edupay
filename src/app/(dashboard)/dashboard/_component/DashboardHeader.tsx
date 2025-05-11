"use client";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import React, { useState } from "react";

const DashboardHeader = () => {
  //   const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* <Link
              href="/"
              className={cn(
                "pl-6 flex items-center text-3xl font-semibold text-green-800",
                poppins.className
              )}
            >
              <span className="">Edu</span>
              <span className="text-yellow-500">pay</span>
            </Link> */}
          </div>
          <div className="flex items-center space-x-4">
            {/* {session?.user && ( */}
            <div className="flex items-center space-x-2">
              <UserCircle className="h-8 w-8 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Welcome, User
              </span>
            </div>
            {/* )} */}
            <Button
              variant="outline"
              className="flex md:hidden items-center space-x-2 border-gray-300 hover:bg-gray-100 hover:text-red-500 transition-colors"
              onClick={handleSignOut}
              disabled={isLoggingOut}
            >
              <LogOut className="h-4 w-4" />
              <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardHeader;
