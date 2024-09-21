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
      const response = await axios.post("/api/student/login", { email, password });
      toast.success(response.data.message);

      // If login is successful, redirect to profile
      router.push("/student/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  // return (
  //   <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
  //     <h2>Login</h2>
  //     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  //       <input
  //         type="email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         placeholder="Email"
  //         style={{ padding: '10px', fontSize: '16px' }}
  //       />
  //       <input
  //         type="password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         placeholder="Password"
  //         style={{ padding: '10px', fontSize: '16px' }}
  //       />
  //       <button
  //         onClick={handleLogin}
  //         style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
  //       >
  //         Login
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md"
        style={{ transform: 'translateY(-20px)' }}
      >
        <h2 className="text-black text-2xl font-bold mb-6 text-center">Student Login</h2>
        <form onSubmit={handleLogin}>
          {/* Registration Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="registrationNumber">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registration number"
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
