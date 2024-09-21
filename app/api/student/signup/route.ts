import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/studentModel";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailers"; // Make sure this is your email sending function

connect();

export async function POST(request: NextRequest) {
  try {
    const { name, regNo, email, password } = await request.json();

    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return NextResponse.json({ error: "Student already exists" }, { status: 400 });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiry = Date.now() + 300000; // 5 minutes validity

    // Create new student
    const newStudent = new Student({
      name,
      regNo,
      email,
      password, // No hashing
      otp,
      otpExpiry,
    });

    await newStudent.save();
    await sendEmail({ email, otp }); // Send OTP email

    return NextResponse.json({ message: "Signup successful, check your email for OTP." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
