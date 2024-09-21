import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/studentModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    const student = await Student.findOne({ email });
    if (!student || student.otp !== otp || Date.now() > student.otpExpiry) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // Mark as verified and clear OTP
    student.otp = undefined;
    student.otpExpiry = undefined;
    await student.save();

    return NextResponse.json({ message: "OTP verified successfully, you can now log in." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
