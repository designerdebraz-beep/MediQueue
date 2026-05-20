"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Mytutorpage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেজ থেকে শুধুমাত্র নিজের ইনসার্ট করা টিউটরদের ডেটা নিয়ে আসার ফাংশন
  const fetchMyTutors = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:8080";
    try {
      // 👈 এখানে রুট পরিবর্তন করে /my-tutors করা হয়েছে
      const res = await fetch(`${baseUrl}/my-tutors`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch tutors");
      const data = await res.json();
      setTutors(data);
    } catch (error) {
      console.error(error);
      toast.error("Could not load your added tutors list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTutors();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-500 gap-3">
        <div className="w-8 h-8 border-4 border-[#2d9282] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium">Loading your added tutors...</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 max-w-[1200px] mx-auto">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900">My Inserted Tutors</h2>
        <p className="text-gray-500 mt-2">Only displaying the tutors you have inserted from the Add Tutor form.</p>
      </div>

      {tutors.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[24px] border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-lg font-medium">No tutors inserted by you yet!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div 
              key={tutor._id} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="h-52 w-full bg-gray-50 relative overflow-hidden">
                <img 
                  src={tutor.image || "https://images.unsplash.com/photo-1544717305-2782549b5136"} 
                  alt={tutor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-[#2d9282] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  {tutor.mode}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2d9282] bg-[#2d9282]/10 px-2.5 py-1 rounded-md">
                      {tutor.subject}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      ৳{tutor.hourlyFee}/hr
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1 mb-1">
                    {tutor.name}
                  </h3>
                  
                  <p className="text-xs text-gray-500 font-medium mb-3 flex items-center gap-1">
                    📍 {tutor.location}
                  </p>

                  <div className="space-y-2 border-t border-gray-50 pt-3 text-sm text-gray-600">
                    <p className="line-clamp-1">
                      <span className="font-semibold text-gray-700">Institution:</span> {tutor.institution}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                  <div className="text-gray-500">
                    Slots: <span className="text-gray-800 font-bold">{tutor.remainingSlots ?? tutor.totalSlot}</span>/{tutor.totalSlot}
                  </div>
                  <div className="text-gray-400 font-normal">
                    {tutor.available}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mytutorpage;