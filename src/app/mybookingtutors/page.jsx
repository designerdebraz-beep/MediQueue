"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Mybookingtutors = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/bookings`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok)
        throw new Error("Failed to fetch bookings");

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


   useEffect(() => {
        
        document.title = "My Booked Tutors list | MediQueue";
      }, []);
  

  // CANCEL BOOKING
  const handleCancelStatus = async (id) => {
    if (
      !confirm(
        "Are you sure you want to cancel this session?"
      )
    )
      return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/bookings/${id}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success(
          "Booking cancelled successfully"
        );

        setBookings(
          bookings.map((booking) =>
            booking._id === id
              ? {
                  ...booking,
                  status: "cancelled",
                }
              : booking
          )
        );
      } else {
        throw new Error(
          result.message || "Failed to cancel"
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "Something went wrong"
      );
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-500 gap-3">
        <div className="w-8 h-8 border-4 border-[#2d9282] border-t-transparent rounded-full animate-spin"></div>

        <p className="text-sm font-medium">
          Loading your bookings...
        </p>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8 lg:py-10 px-3 sm:px-5 lg:px-6 max-w-7xl mx-auto min-h-screen">

      {/* HEADING */}
      <div className="mb-6 sm:mb-8 text-center md:text-left">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          My Booked Tutors
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Manage and track your upcoming tutor sessions.
        </p>
      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <div className="text-center py-14 sm:py-20 bg-white rounded-2xl sm:rounded-[24px] border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-base sm:text-lg">
            No bookings found. Start booking your favorite tutors!
          </p>
        </div>
      ) : (
        <div className="w-full bg-white rounded-2xl sm:rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">

          {/* TABLE WRAPPER */}
          <div className="w-full overflow-x-auto scrollbar-thin">

            <table className="w-full min-w-[850px] lg:min-w-full text-left border-collapse">

              {/* TABLE HEAD */}
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-700 font-semibold text-xs sm:text-sm whitespace-nowrap">

                  <th className="py-3 sm:py-5 px-3 sm:px-5">
                    Student Name
                  </th>

                  <th className="py-3 sm:py-5 px-3 sm:px-5">
                    Email
                  </th>

                  <th className="py-3 sm:py-5 px-3 sm:px-5">
                    Phone
                  </th>

                  <th className="py-3 sm:py-5 px-3 sm:px-5">
                    Tutor Name
                  </th>

                  <th className="py-3 sm:py-5 px-3 sm:px-5">
                    Booking Date
                  </th>

                  <th className="py-3 sm:py-5 px-3 sm:px-5 text-center">
                    Status
                  </th>

                  <th className="py-3 sm:py-5 px-3 sm:px-5 text-center">
                    Cancel
                  </th>

                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-gray-100 text-gray-800 text-sm">

                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >

                    {/* STUDENT NAME */}
                    <td className="py-3 sm:py-5 px-3 sm:px-5 font-medium text-gray-900 whitespace-nowrap">
                      {booking.name}
                    </td>

                    {/* EMAIL */}
                    <td className="py-3 sm:py-5 px-3 sm:px-5 text-gray-600 whitespace-nowrap">
                      {booking.email}
                    </td>

                    {/* PHONE */}
                    <td className="py-3 sm:py-5 px-3 sm:px-5 text-gray-600 whitespace-nowrap">
                      {booking.phone}
                    </td>

                    {/* TUTOR NAME */}
                    <td className="py-3 sm:py-5 px-3 sm:px-5 whitespace-nowrap">
                      <span className="bg-[#2d9282]/10 text-[#2d9282] px-3 py-1 rounded-full text-xs font-semibold">
                        {booking.tutorName}
                      </span>
                    </td>

                    {/* BOOKING DATE */}
                    <td className="py-3 sm:py-5 px-3 sm:px-5 text-gray-500 whitespace-nowrap">
                      {booking.bookedAt
                        ? new Date(
                            booking.bookedAt
                          ).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            }
                          )
                        : 'N/A'}
                    </td>

                    {/* STATUS */}
                    <td className="py-3 sm:py-5 px-3 sm:px-5 text-center whitespace-nowrap">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                          booking.status ===
                          'cancelled'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-green-100 text-green-600'
                        }`}
                      >
                        {booking.status ||
                          "Confirmed"}
                      </span>

                    </td>

                    {/* CANCEL BUTTON */}
                    <td className="py-3 sm:py-5 px-3 sm:px-5 text-center">

                      <button
                        onClick={() =>
                          handleCancelStatus(
                            booking._id
                          )
                        }
                        disabled={
                          booking.status ===
                          'cancelled'
                        }
                        className={`font-medium p-2 rounded-full transition-all duration-200 border ${
                          booking.status ===
                          'cancelled'
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200'
                        }`}
                        title={
                          booking.status ===
                          'cancelled'
                            ? "Already Cancelled"
                            : "Cancel Booking"
                        }
                      >
                        <span className="px-1.5">
                          ✕
                        </span>
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mybookingtutors;