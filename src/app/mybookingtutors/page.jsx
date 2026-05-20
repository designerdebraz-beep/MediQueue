"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Mybookingtutors = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/bookings`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error(error);
      toast.error("Could not load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelStatus = async (id) => {
    if (!confirm("Are you sure you want to cancel this session?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/bookings/${id}/cancel`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        }
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Booking cancelled successfully");
        
        
        setBookings(bookings.map((booking) => 
          booking._id === id ? { ...booking, status: "cancelled" } : booking
        ));
      } else {
        throw new Error(result.message || "Failed to cancel");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading your bookings...</div>;
  }

  return (
    <div className="py-10 px-4 max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">My Booked Tutors</h2>
        <p className="text-gray-500 mt-1">Manage and track your upcoming tutor sessions.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[24px] border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-lg">No bookings found. Start booking your favorite tutors!</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-[24px] border border-gray-100 shadow-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-700 font-semibold text-sm">
                <th className="p-4 sm:p-5">Student Name</th>
                <th className="p-4 sm:p-5">Email</th>
                <th className="p-4 sm:p-5">Phone</th>
                <th className="p-4 sm:p-5">Tutor Name</th>
                <th className="p-4 sm:p-5">Booking Date</th>
                <th className="p-4 sm:p-5 text-center">Status</th>
                <th className="p-4 sm:p-5 text-center">Cancel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800 text-sm">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-gray-900">{booking.name}</td>
                  <td className="p-4 sm:p-5 text-gray-600">{booking.email}</td>
                  <td className="p-4 sm:p-5 text-gray-600">{booking.phone}</td>
                  <td className="p-4 sm:p-5">
                    <span className="bg-[#2d9282]/10 text-[#2d9282] px-3 py-1 rounded-full text-xs font-semibold">
                      {booking.tutorName}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 text-gray-500">
                    {booking.bookedAt ? new Date(booking.bookedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'N/A'}
                  </td>
                  
                  {/* Status Column with dynamic styles */}
                  <td className="p-4 sm:p-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                      booking.status === 'cancelled' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {booking.status || "Confirmed"}
                    </span>
                  </td>

                  {/* Cancel Action Button */}
                  <td className="p-4 sm:p-5 text-center">
                    <button
                      onClick={() => handleCancelStatus(booking._id)}
                      disabled={booking.status === 'cancelled'}
                      className={`font-medium p-1.5 rounded-full transition-colors border ${
                        booking.status === 'cancelled'
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200'
                      }`}
                      title={booking.status === 'cancelled' ? "Already Cancelled" : "Cancel Booking"}
                    >
                      
                      <span className="px-2">✕</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Mybookingtutors;