"use client";

import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';





export default function Banner() {


  return (
    <section className="bg-[#f5f5f5] py-16">
      <>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
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
                  <Link href={"/tutors"}>
                    <button className="mt-10 cursor-pointer bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white font-bold px-10 py-4 rounded-full shadow-lg">
                      BOOK A SESSION
                    </button>
                  </Link>
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
          </SwiperSlide>
          <SwiperSlide>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

                {/* Left Content */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#2d9282]/10 text-[#2d9282] px-4  rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                    🚀 Elevate Your Learning
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                    Find the Perfect Tutor <br />
                    <span className="text-[#2d9282]">For Your Success</span>
                  </h1>

                  <p className="mt-6 text-lg text-gray-600 max-w-lg leading-relaxed">
                    Connect with expert tutors for personalized 1-on-1 learning experiences. Boost your grades and master new skills from the comfort of your home.
                  </p>

                  <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8 text-sm text-gray-600 font-medium">
                    <span className="flex items-center gap-1.5">🎓 100+ Expert Tutors</span>
                    <span className="flex items-center gap-1.5">🎯 Tailored Sessions</span>
                    <span className="flex items-center gap-1.5">💳 Affordable Hourly Rates</span>
                  </div>
                  <Link href={"/tutors"}>
                    <button className="mt-10 cursor-pointer bg-[#2d9282] hover:bg-[#227064] transition-all duration-300 text-white font-semibold px-8 py-4 rounded-xl shadow-md shadow-[#2d9282]/20 hover:shadow-lg transform hover:-translate-y-0.5">
                      BOOK A SESSION
                    </button>
                  </Link>
                </div>

                {/* Right Image */}
                <div className="flex justify-center">
                  <div className="relative">

                    {/* Main Tutor Image Box */}
                    <div className="bg-white border border-gray-100 rounded-[28px] p-4 shadow-xl shadow-gray-100">
                      <div className="overflow-hidden rounded-[20px] bg-gray-50 aspect-[4/3] w-[450px] max-w-full">
                        <Image
                          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" // টিচিং রিলেটেড হাই-কোয়ালিটি ইমেজ
                          width={500}
                          height={375}
                          alt="Professional Tutoring Session"
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                    </div>

                    {/* Small Overlay Student/Success Box */}
                    <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl border border-gray-50 shadow-xl p-3 flex items-center gap-3 hidden sm:flex">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
                          alt="Happy Student"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">Sarah Jenkins</p>
                        <p className="text-[10px] font-semibold text-[#2d9282]">Verified Student</p>
                      </div>
                    </div>

                    {/* Total Active Students Badge */}
                    <div className="absolute -top-4 -right-4 bg-gray-900 text-white rounded-2xl shadow-xl px-4 py-3 text-center hidden sm:block">
                      <p className="text-lg font-black tracking-tight text-white">5k+</p>
                      <p className="text-[10px] font-medium text-gray-400">Active Learners</p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>

        </Swiper>
      </>

    </section>
  );
}