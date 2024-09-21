import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  regNo: String,
  email: { type: String, unique: true },
  password: String,
  otp: String, // Store OTP as plain text temporarily
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;
