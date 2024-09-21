import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/warden/verifyotp", { email, otp });
      toast.success(response.data.message); // Show success message
      setLoading(false);
      
      // Display success message for a brief moment and then redirect
      setTimeout(() => {
        toast.success("Verification successful! Redirecting to login..."); // Success message
        router.push("/warden/login"); // Redirect to the login page
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Verification failed");
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Enter OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        style={{ padding: "10px", fontSize: "16px", width: "100%" }}
      />
      <button
        onClick={verifyOtp}
        style={{ padding: "10px", fontSize: "16px", cursor: "pointer", marginTop: "10px" }}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Processing..." : "Verify OTP"}
      </button>
    </div>
  );
};

export default OtpVerification;
