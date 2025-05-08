import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import connectDB from "@/config/connectDB";
// import { connectToDB } from "@/config/db"

export async function POST(request: NextRequest) {
    try {
      const { firstname, lastname, email, password } = await request.json();
    if (!firstname || !lastname || !email || !password) {
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
      email,
      password,
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
