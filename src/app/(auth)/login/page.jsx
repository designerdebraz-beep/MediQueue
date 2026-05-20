'use client'
import toast, { Toaster } from "react-hot-toast";

import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';



export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

   

  const { email, password } = formData;

  try {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Login failed");
      return;
    }

    toast.success("Login successful!");
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong");
  }
    
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Reset password link triggered!');
  };

  const handleGoogleSignIn = async () => {
    // Integrate your OAuth handler here (e.g., Firebase signInWithPopup or NextAuth signIn('google'))
    
    await authClient.signIn.social({
      provider: "google"
    })
    // const { data:token, error } = await authClient.token()
    // console.log(token)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-[24px] border border-gray-100 shadow-md transition-all duration-200">
        
        {/* Title Block */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight font-serif">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please log in to your account to continue.
          </p>
        </div>

        {/* Form Block */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2d9282] focus:border-transparent transition-all text-[15px]"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              
              {/* Forgot Password Link */}
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-medium text-[#2d9282] hover:text-[#227064] transition-colors focus:outline-none focus:underline"
              >
                Forgot Password?
              </button>
            </div>
            
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2d9282] focus:border-transparent transition-all text-[15px]"
              placeholder="••••••••"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-[#2d9282] hover:bg-[#227064] text-white py-3.5 px-4 rounded-xl text-[16px] font-medium shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2d9282]"
          >
            Log In
          </button>
        </form>

        {/* --- Beautiful Divider Lines --- */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs text-gray-400 uppercase">
            <span className="bg-white px-3">Or continue with</span>
          </div>
        </div>

        {/* --- Google Sign-In Button --- */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 border border-gray-200 rounded-xl shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
        >
          {/* Google High-Quality Flat SVG Icon */}
          <svg className="w-5 h-5" viewBox="0 0 24 24" width="100%" height="100%">
            <path
              fill="#EA4335"
              d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3A11.952 11.952 0 0 0 12 .909a11.944 11.944 0 0 0-8.523 3.518l1.79 5.338z"
            />
            <path
              fill="#4285F4"
              d="M23.455 12.273c0-.818-.073-1.609-.209-2.373H12v4.5h6.423a5.487 5.487 0 0 1-2.382 3.6l3.71 2.873c2.163-2 3.704-4.936 3.704-8.6z"
            />
            <path
              fill="#FBBC05"
              d="M5.266 14.235L3.477 19.573A11.944 11.944 0 0 0 12 23.091c2.945 0 5.655-1.027 7.75-2.745l-3.71-2.873a7.11 7.11 0 0 1-4.04 1.209 7.077 7.077 0 0 1-6.734-4.447z"
            />
            <path
              fill="#34A853"
              d="M1.545 4.427L5.266 9.765A7.066 7.066 0 0 1 12 4.909c.814 0 1.59.14 2.314.395l3.41-3.41A11.954 11.954 0 0 0 12 .909 11.947 11.947 0 0 0 1.545 4.427z"
            />
          </svg>
          Sign in with Google
        </button>

        {/* Optional Registration Redirect Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Dont have an account?{' '}
          <a href="/register" className="font-semibold text-[#2d9282] hover:underline">
            Register here
          </a>
        </div>

      </div>
    </div>
  );
}