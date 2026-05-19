'use client'
import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react';
import Image from 'next/image';
import { object } from 'better-auth';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';


export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoUrl: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [email]: value,
      [photoUrl]: value,
      [password]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

     const { name, email, photoUrl, password } = formData;

  const { data, error } = await authClient.signUp.email({
    name,
    email,
    password,
    image: photoUrl,
  });

  if (error) {
    toast.error(error.message || "Registration failed");
    return;
  }

  toast.success("Successfully created!");

  router.push("/");
    
  };

  const handleGoogleSignUp = async () => {
    // Integrate your Google OAuth provider logic here
    await authClient.signIn.social({
          provider: "google"
        })
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-[24px] border border-gray-100 shadow-md transition-all duration-200">
        
        {/* Title Block */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight font-serif">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Join our platform to book your sessions effortlessly.
          </p>
        </div>

        {/* Form Block */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2d9282] focus:border-transparent transition-all text-[15px]"
              placeholder="John Doe"
            />
          </div>

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

          {/* Photo URL Field */}
          <div>
            <label htmlFor="photoUrl" className="block text-sm font-semibold text-gray-800 mb-1.5">
              Profile Photo URL
            </label>
            <input
              id="photoUrl"
              name="photoUrl"
              type="url"
              required
              value={formData.photoUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2d9282] focus:border-transparent transition-all text-[15px]"
              placeholder="https://images.unsplash.com/... or external link"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-1.5">
              Password
            </label>
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

          {/* Optional Terms Notice */}
          <p className="text-xs text-gray-400 text-center px-2">
            By registering, you agree to our Terms of Service and Privacy Policy.
          </p>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-[#2d9282] hover:bg-[#227064] text-white py-3.5 px-4 rounded-xl text-[16px] font-medium shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2d9282]"
          >
            Register
          </button>
        </form>

        {/* --- Divider --- */}
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
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 border border-gray-200 rounded-xl shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
        >
          {/* Google SVG Icon */}
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
          Sign up with Google
        </button>

        {/* Optional Login Redirect */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-[#2d9282] hover:underline">
            Log in here
          </a>
        </div>

      </div>
    </div>
  );
}