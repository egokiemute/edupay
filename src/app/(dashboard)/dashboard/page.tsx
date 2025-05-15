"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StartPayment from "./_component/StartPayment";
import RecentPayments from "./_component/RecentPayments";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Welcome to Your Dashboard
              </h2>
              <p className="text-gray-600 mb-4">
                This is your Edupay School Fees Portal dashboard where you can
                manage your payments, view your courses, and update your profile
                information.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-700 mb-2">
                  Quick Actions
                </h3>
                <div className="flex items-center gap-5">
                  {/* <Button className="bg-green-800 hover:bg-green-700">
                    Make a Payment
                  </Button> */}
                  <StartPayment />
                  {/* <Link href="/dashboard/payment-history">
                    <Button
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50 w-fit"
                    >
                      View Payment History
                    </Button>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
          <RecentPayments />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
