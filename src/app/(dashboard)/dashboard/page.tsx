"use client";
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle, Home, CreditCard, School, Settings } from 'lucide-react';

const DashboardPage = () => {
//   const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-green-600">Edupay Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* {session?.user && ( */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    {/* Welcome, {session.user.name || 'User'} */}
                    Welcome, User
                  </span>
                  <UserCircle className="h-8 w-8 text-gray-500" />
                </div>
              {/* )} */}
              <Button 
                variant="outline" 
                className="flex items-center space-x-2 border-gray-300 hover:bg-gray-100 hover:text-red-500 transition-colors"
                onClick={handleSignOut}
                disabled={isLoggingOut}
              >
                <LogOut className="h-4 w-4" />
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="bg-white shadow rounded-lg p-4">
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

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome to Your Dashboard</h2>
              <p className="text-gray-600 mb-4">
                This is your Edupay School Fees Portal dashboard where you can manage your payments,
                view your courses, and update your profile information.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-700 mb-2">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Make a Payment
                  </Button>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    View Payment History
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;