import { NextRequest, NextResponse } from "next/server";
import Staff from "@/models/staffModel";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailers"; // Make sure this is your email sending function

connect();

export async function POST(request: NextRequest) {
  try {
    const { name, staffID, email, password } = await request.json();

    // Check if the staff already exists
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return NextResponse.json({ error: "Staff already exists" }, { status: 400 });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiry = Date.now() + 300000; // 5 minutes validity

    // Create new staff
    const newStaff = new Staff({
      name,
      staffID,
      email,
      password, // No hashing
      otp,
      otpExpiry,
    });

    await newStaff.save();
    await sendEmail({ email, otp }); // Send OTP email

    return NextResponse.json({ message: "Signup successful, check your email for OTP." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
