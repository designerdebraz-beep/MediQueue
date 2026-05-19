"use client";

import Image from "next/image";

export default function Banner() {
  return (
    <section className="bg-[#f5f5f5] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

          {/* Left Content */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Book a Tutor <br /> Anytime, Anywhere
            </h1>

            <p className="mt-6 text-xl text-gray-700 max-w-lg">
              Private 1-to-1 online tutoring sessions starting at just $10/hour.
            </p>

            <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600 font-medium">
              <span>📚 Expert Tutors</span>
              <span>🧠 Personalized Learning</span>
              <span>🔒 Safe & Secure Classes</span>
            </div>

            <button className="mt-10 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-bold px-10 py-4 rounded-full shadow-lg">
              BOOK A SESSION
            </button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="relative">

              {/* Main Tutor Image */}
              <div className="bg-black rounded-[20px] p-3 shadow-2xl">
                <Image
                  src="/herobanner.png"
                  width={500}
                  height={300}
                  alt="herobanner"
                  className=" object-cover rounded-12px"
                />
              </div>

              {/* Small Student Video */}
              <div className="absolute bottom-6 right-6 bg-white rounded-xl shadow-lg p-2">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
                  alt="Student"
                  width={60}
                  height={20}
                  className=" object-cover rounded-lg"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}