import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Staff from "@/models/staffModel"; // Ensure this points to the correct model
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const staffId = await getDataFromToken(request);
    const staff = await Staff.findOne({ _id: staffId }).select("-password"); // Exclude password for security
    if (!staff) {
      return NextResponse.json({ error: "Staff not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Staff found",
      data: staff,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
