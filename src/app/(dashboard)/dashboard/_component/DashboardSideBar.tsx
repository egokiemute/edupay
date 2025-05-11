"use client";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Home,
  LogOut,
  School,
  Settings,
  UserCircle,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const DashboardSideBar = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <Sidebar className="px-3 space-y-10 p-4 bg-white flex flex-col relative items-start justify-between overflow-hidden">
      <div className="">
        <SidebarHeader className="pt-4 pl-0">
          <div className="flex items-center">
            <Link
              href="/"
              className={cn(
                "pl-1 flex items-center text-3xl font-semibold text-green-800",
                poppins.className
              )}
            >
              <span className="">Edu</span>
              <span className="text-yellow-500">pay</span>
            </Link>
          </div>
        </SidebarHeader>
        <div className="pt-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 p-2 bg-green-50 text-green-600 rounded-md">
              <Home className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <span>Payments</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <School className="h-5 w-5 text-gray-500" />
              <span>Courses</span>
            </div>
            <div className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer">
              <Settings className="h-5 w-5 text-gray-500" />
              <span>Settings</span>
            </div>
          </div>
        </div>
      </div>
      <SidebarFooter className="fixed bottom-10">
        <div className="flex flex-col items-start space-y-4">
          {/* {session?.user && ( */}
          <div className="flex items-center space-x-2">
            <UserCircle className="h-8 w-8 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">User</span>
          </div>
          {/* )} */}
          <Button
            variant="outline"
            className="flex items-center space-x-2 border-gray-300 hover:bg-gray-100 hover:text-red-500 transition-colors"
            onClick={handleSignOut}
            disabled={isLoggingOut}
          >
            <LogOut className="h-4 w-4" />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSideBar;
