import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import Warden from "@/models/wardenModel"; // Ensure this points to the correct model
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const wardenId = await getDataFromToken(request);
    const warden = await Warden.findOne({ _id: wardenId }).select("-password"); // Exclude password for security
    if (!warden) {
      return NextResponse.json({ error: "Warden not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Warden found",
      data: warden,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
