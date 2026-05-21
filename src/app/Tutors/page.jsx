"use client";

import Coursecard from '@/Component/Course';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const TutorsPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  const loadCourses = async (searchVal = "", startVal = "", endVal = "") => {
    try {
      const params = new URLSearchParams();
      
      if (searchVal && searchVal.trim() !== "") params.append("search", searchVal.trim());
      if (startVal) params.append("startDate", startVal);
      if (endVal) params.append("endDate", endVal);

      const res = await fetch(`${baseUrl}/tutors?${params.toString()}`, {
        cache: "no-store"
      });
      
      if (!res.ok) throw new Error("Failed to fetch tutors");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Frontend Fetch Error:", error);
      toast.error("Failed to load tutors from database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses("", "", "");
  }, []);

 
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchText(val);
    loadCourses(val, startDate, endDate); // রিয়েল-টাইম ফিল্টারিং
  };

 
  const handleStartDateChange = (e) => {
    const val = e.target.value;
    setStartDate(val);
    loadCourses(searchText, val, endDate);
  };


  const handleEndDateChange = (e) => {
    const val = e.target.value;
    setEndDate(val);
    loadCourses(searchText, startDate, val);
  };

  // ৫. রিসেট ফিল্টার
  const handleResetFilters = () => {
    setSearchText("");
    setStartDate("");
    setEndDate("");
    setLoading(true);
    loadCourses("", "", "");
  };

  return (
    <div className="py-10 px-4 max-w-[1250px] mx-auto bg-[#fcfcfc] min-h-screen">
      
      {/* Heading */}
      <h2 className='font-bold text-3xl px-4 md:px-7 mb-6 text-gray-900'>
        All Tutors
      </h2>

      {/* 🔍 Search and Filter Panel */}
      <div className='px-4 md:px-7 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end'>
        
        {/* Search Input */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Search Tutor</label>
          <input
            type="text"
            placeholder="Search tutor by name..."
            value={searchText}
            onChange={handleSearchChange}
            className='w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#2d9282] transition-colors bg-white shadow-sm'
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className='w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#2d9282] transition-colors bg-white shadow-sm text-gray-500'
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className='w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#2d9282] transition-colors bg-white shadow-sm text-gray-500'
          />
        </div>

        {/* Reset Button */}
        <div>
          <button
            onClick={handleResetFilters}
            className='w-full py-2.5 text-sm font-medium border border-gray-200 hover:border-red-400 hover:text-red-500 text-gray-700 rounded-xl bg-white transition-all shadow-sm active:scale-[0.98]'
          >
            Reset Filters
          </button>
        </div>

      </div>

      {/* 🔄 কার্ড ডিসপ্লে গ্রিড */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500 gap-3">
          <div className="w-8 h-8 border-4 border-[#2d9282] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium">Loading all tutors...</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-7 py-4'>
          {courses.length > 0 ? (
            courses.map(course => (
              <Coursecard
                key={course._id}
                course={course}
              />
            ))
          ) : (
            <div className='col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm'>
              <p className='text-gray-400 text-lg font-medium'>No tutor found matching your search!</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default TutorsPage;