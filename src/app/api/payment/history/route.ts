import connectDB from "@/config/connectDB";
import PaymentModel from "@/models/PaymentModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB(); // Ensure database connection

    const payments = await PaymentModel.find().sort({ paymentDate: -1 }); // Sort by newest first

    // const data = payments;
    // console.log("Payments ", data)
    return NextResponse.json(
      { success: true, data: payments },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch payments",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
