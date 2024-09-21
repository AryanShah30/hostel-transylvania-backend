import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/studentModel"; // Ensure this points to the correct model
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const studentId = await getDataFromToken(request);
    const student = await Student.findOne({ _id: studentId }).select("-password"); // Exclude password for security
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Student found",
      data: student,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
