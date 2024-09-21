import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
  name: String,
  staffID: String,
  email: { type: String, unique: true },
  password: String,
  otp: String, // Store OTP as plain text temporarily
});

const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);

export default Staff;
