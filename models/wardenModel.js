import mongoose from "mongoose";

const WardenSchema = new mongoose.Schema({
  name: String,
  employeeID: String,
  email: { type: String, unique: true },
  password: String,
  otp: String, // Store OTP as plain text temporarily
});

const Warden = mongoose.models.Warden || mongoose.model('Warden', WardenSchema);

export default Warden;
