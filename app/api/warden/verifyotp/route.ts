import { NextRequest, NextResponse } from "next/server";
import Warden from "@/models/wardenModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    const warden = await Warden.findOne({ email });
    if (!warden || warden.otp !== otp || Date.now() > warden.otpExpiry) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // Mark as verified and clear OTP
    warden.otp = undefined;
    warden.otpExpiry = undefined;
    await warden.save();

    return NextResponse.json({ message: "OTP verified successfully, you can now log in." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
