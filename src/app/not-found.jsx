"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-6">
      
      <div className="text-center max-w-2xl">

        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-blue-500">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-6 text-4xl font-bold text-gray-900">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link href="/">
            <button className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-semibold px-8 py-4 rounded-full shadow-lg">
              Back To Home
            </button>
          </Link>

          <Link href="/courses">
            <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 font-semibold px-8 py-4 rounded-full">
              Browse Courses
            </button>
          </Link>

        </div>

      </div>

    </section>
  );
}