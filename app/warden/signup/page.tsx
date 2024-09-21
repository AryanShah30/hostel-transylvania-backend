"use client"; 

import React, { useState } from "react";
import axios from "axios";
import OtpVerification from "../verifyotp/OtpVerification"; 
import { toast } from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [employeeID, setEmployeeID] = useState(""); // Updated variable name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post("/api/warden/signup", { name, employeeID, email, password });
      toast.success(response.data.message);
      setShowOtp(true); 
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md mb-6" style={{ transform: 'translateY(-20px)' }}>
        <h2 className="text-black text-2xl font-bold mb-6 text-center">Sign Up!</h2>
        <form onSubmit={handleSignup}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          {/* Employee ID */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="employeeID">
              Employee ID
            </label>
            <input
              type="text"
              id="employeeID"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)} // Updated to use setEmployeeID
              placeholder="Enter your Employee ID"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          {/* Email ID */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="emailID">
              Email ID
            </label>
            <input
              type="email"
              id="emailID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      {showOtp && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10">
          <OtpVerification email={email} />
        </div>
      )}
    </div>
  );
};

export default Signup;
