"use client";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  Home,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const DashboardSideBar = () => {
  const session = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();

  const { data } = session;

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/login" });
  };

  const sidebarItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Dashboard",
      activeClass: pathname === "/dashboard" ? "bg-green-50 text-green-600" : "hover:bg-gray-50",
    },
    {
      href: "/dashboard/payment-history",
      icon: CreditCard,
      label: "Payments",
      activeClass: pathname === "/dashboard/payment-history" ? "bg-green-50 text-green-600" : "hover:bg-gray-50",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      label: "Settings",
      activeClass: pathname === "/dashboard/settings" ? "bg-green-50 text-green-600" : "hover:bg-gray-50",
    }
  ];

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
            {sidebarItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer ${item.activeClass}`}
              >
                <item.icon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <SidebarFooter className="fixed bottom-10">
        <div className="flex flex-col items-start space-y-4 w-full">
          <div className="flex items-center space-x-2">
            <UserCircle className="h-8 w-8 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {data?.user?.name || "User"}
            </span>
          </div>
          <Button
            variant="destructive"
            className="cursor-pointer border-0 w-full"
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