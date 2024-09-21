import { NextRequest, NextResponse } from "next/server";
import Warden from "@/models/wardenModel";
import { connect } from "@/dbConfig/dbConfig";
import { toast } from "react-hot-toast";
import {useRouter} from "next/navigation";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check if warden exists
    const warden = await Warden.findOne({ email });
    if (!warden) {
      return NextResponse.json({ error: "Warden does not exist" }, { status: 400 });
    }

    // Check if password is correct (simple check)
    if (warden.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }


    return NextResponse.json({
      message: "Login successful!",
      warden: {
        name: warden.name,
        email: warden.email,
        employeeID: warden.employeeID,
      },
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
