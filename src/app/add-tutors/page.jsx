"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const AddTutorForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    
    const tutorData = {
      name: form.name.value,
      image: form.image.value,
      subject: form.subject.value,
      available: form.available.value,
      hourlyFee: form.hourlyFee.value,
      totalSlot: form.totalSlot.value,
      sessionStartDate: form.sessionStartDate.value,
      institution: form.institution.value,
      experience: form.experience.value,
      location: form.location.value,
      mode: form.mode.value,
    };

  
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:8080";

    try {
      const res = await fetch(`${baseUrl}/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tutorData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to add tutor");

     
      toast.success("Tutor added successfully!");
      form.reset(); 

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md border border-gray-100 rounded-2xl p-6 md:p-10 my-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Add Tutor</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tutor Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Tutor Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter tutor name"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d9282]"
            required
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Photo URL</label>
          <input
            type="url"
            name="image"
            placeholder="imgbb / postimage link"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d9282]"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Subject / Category</label>
          <select
            name="subject"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d9282]"
            required
          >
            <option value="">Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="English">English</option>
            <option value="ICT">ICT</option>
          </select>
        </div>

        {/* Available */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Available Days and Time</label>
          <input
            type="text"
            name="available"
            placeholder="Sun - Thu 5:00 PM - 8:00 PM"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d9282]"
            required
          />
        </div>

        {/* Hourly Fee */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Hourly Fee</label>
          <input
            type="number"
            name="hourlyFee"
            placeholder="500"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d9282]"
            required
          />
        </div>

        {/* Total Slot */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Total Slot</label>
          <input
            type="number"
            name="totalSlot"
            placeholder="10"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d9282]"
            required
          />
        </div>

        {/* Session Start Date */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Session Start Date</label>
          <input
            type="date"
            name="sessionStartDate"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d9282]"
            required
          />
        </div>

        {/* Institution */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Institution</label>
          <input
            type="text"
            name="institution"
            placeholder="Dhaka University"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d9282]"
            required
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Experience</label>
          <textarea
            name="experience"
            rows="4"
            placeholder="3 years teaching experience..."
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d9282]"
            required
          ></textarea>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Location (Area/City)</label>
          <input
            type="text"
            name="location"
            placeholder="Khulna"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d9282]"
            required
          />
        </div>

        {/* Teaching Mode */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Teaching Mode</label>
          <select
            name="mode"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2d9282]"
            required
          >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Both">Both</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2d9282] hover:bg-[#227064] text-white py-3 rounded-lg font-medium transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Adding Tutor..." : "Add Tutor"}
        </button>
      </form>
    </div>
  );
};

export default AddTutorForm;