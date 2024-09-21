import { NextRequest, NextResponse } from "next/server";
import Staff from "@/models/staffModel";
import { connect } from "@/dbConfig/dbConfig";
import { toast } from "react-hot-toast";
import {useRouter} from "next/navigation";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check if staff exists
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return NextResponse.json({ error: "Staff does not exist" }, { status: 400 });
    }

    // Check if password is correct (simple check)
    if (staff.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }


    return NextResponse.json({
      message: "Login successful!",
      staff: {
        name: staff.name,
        email: staff.email,
        staffID: staff.staffID,
      },
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
