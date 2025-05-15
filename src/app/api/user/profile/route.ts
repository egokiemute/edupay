import { getServerSession } from "next-auth/next";
import UserModel from "@/models/User";
import connectDB from "@/config/connectDB";
import authOptions from "@/lib/authOptions";
import { NextRequest, NextResponse } from "next/server";

// Type definitions for session structure
interface SessionUser {
  email?: string;
  id?: string;
  sub?: string;
  [key: string]: string | number | boolean | undefined;
}

type Session = {
  user: {
    email: string;
    id?: string;
    sub?: string;
    [key: string]: string | number | boolean | undefined;
  };
  [key: string]: string | number | boolean | object | undefined;
};

export async function GET(req: NextRequest) {
  try {
    const session = (await getServerSession(authOptions)) as Session;
    
    console.log("Full session data:", JSON.stringify(session, null, 2)); // Debug the full session
    
    // Check if session exists at all
    if (!session) {
      return NextResponse.json(
        { success: false, message: "No session found" },
        { status: 401 }
      );
    }
    
    // Check what's in the user object
    console.log("Session user:", session.user);
    
    // Get user email from session
    const userEmail = session.user?.email;
    
    if (!userEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "User email not found in session",
          debug: { sessionStructure: Object.keys(session) },
        },
        { status: 401 }
      );
    }
    
    // Connect to database
    await connectDB();
    
    // Find the user by email excluding the password field
    const user = await UserModel.findOne({ email: userEmail }).select("-password").lean();
    
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found in database",
          debug: { userEmail },
        },
        { status: 404 }
      );
    }
    
    // Convert MongoDB document to plain object and ensure _id is properly converted to string
    const userDoc = Array.isArray(user) ? user[0] : user;
    const userData = {
      ...userDoc,
      _id: userDoc?._id?.toString(),
    };
    
    // Return the user data
    return NextResponse.json(
      { success: true, user: userData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}