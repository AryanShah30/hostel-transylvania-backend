"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { toast } from "react-hot-toast"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/warden/login", { email, password });
      toast.success(response.data.message);
      
      // If login is successful, redirect to profile
      router.push("/warden/profile"); 
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md"
        style={{ transform: 'translateY(-20px)' }}
      >        
        <h2 className="text-black text-2xl font-bold mb-6 text-center">Warden Login</h2>
        <form onSubmit={handleLogin}>
          {/* Registration Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="registrationNumber">
              Email Address
            </label>
            <input
              type="text"
              id="registrationNumber"
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
                Login
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
