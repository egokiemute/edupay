import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import connectDB from "@/config/connectDB";
// import { connectToDB } from "@/config/db"

export async function POST(request: NextRequest) {
  try {
    const { firstname, lastname, studentId, email, password, role } = await request.json();
    if (!firstname || !lastname || !studentId || !email || !password) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const user = await UserModel.create({
      firstname,
      lastname,
      studentId,
      email,
      password,
      role: role || "user", // Default to 'admin' if no role is provided
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: `Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}