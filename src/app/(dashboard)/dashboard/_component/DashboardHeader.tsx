"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
// import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React, { useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const DashboardHeader = () => {
  const session = useSession();
  // const { user } = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // console.log("session ", session);
  // console.log(user)

  const { data } = session;
  console.log("name ", data);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/login" });
  };

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
              {/* <UserCircle className="h-8 w-8 text-gray-500" /> */}
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage src={data?.user?.image as string} />
                    <AvatarFallback>
                      {/* {getAvatarDisplayName(data?.user?.firstname, data?.user?.lastname)}
                       */}
                      OG
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <p className="font-semibold py-2 text-black">
                    {data?.user?.name || "User"}
                  </p>
                  <div className="p-[0.5px] bg-gray=200"></div>
                  <Button
                    variant="destructive"
                    onClick={handleSignOut}
                    disabled={isLoggingOut}
                    className="w-full mt-4 cursor-pointer"
                  >
                    <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                  </Button>
                </PopoverContent>
              </Popover>
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
