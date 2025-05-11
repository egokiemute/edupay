import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import DashboardSideBar from "./_component/DashboardSideBar";
import DashboardHeader from "./_component/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="overflow-hidden">
      {/* sidebar left side */}
      <DashboardSideBar />

      {/* sidebar right side */}
      <main className="w-full">
        <DashboardHeader />

        {/* Children */}
        {children}
      </main>
    </SidebarProvider>
  );
}
