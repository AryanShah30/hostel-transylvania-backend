import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/studentModel";
import { connect } from "@/dbConfig/dbConfig";
import { toast } from "react-hot-toast";
import {useRouter} from "next/navigation";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check if student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return NextResponse.json({ error: "Student does not exist" }, { status: 400 });
    }

    // Check if password is correct (simple check)
    if (student.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }


    return NextResponse.json({
      message: "Login successful!",
      student: {
        name: student.name,
        email: student.email,
        regNo: student.regNo,
      },
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
