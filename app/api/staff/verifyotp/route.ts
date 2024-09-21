import { NextRequest, NextResponse } from "next/server";
import Staff from "@/models/staffModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    const staff = await Staff.findOne({ email });
    if (!staff || staff.otp !== otp || Date.now() > staff.otpExpiry) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // Mark as verified and clear OTP
    staff.otp = undefined;
    staff.otpExpiry = undefined;
    await staff.save();

    return NextResponse.json({ message: "OTP verified successfully, you can now log in." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
