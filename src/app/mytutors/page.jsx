"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Mytutorpage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:8080";

  const fetchMyTutors = async () => {
    try {
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

  // DELETE
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this tutor?"
    );

    if (!isConfirmed) return;

    const deleteToastId = toast.loading("Deleting tutor...");

    try {
      const res = await fetch(`${baseUrl}/tutors/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Tutor deleted successfully!", {
          id: deleteToastId,
        });

        setTutors((prev) =>
          prev.filter((tutor) => tutor._id !== id)
        );
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong while deleting", {
        id: deleteToastId,
      });
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (tutor) => {
    setSelectedTutor({
      ...tutor,
      photoUrl: tutor.image || "",
      teachingMode: tutor.mode || "Online",
    });

    setIsModalOpen(true);
  };

  // INPUT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectedTutor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updateToastId = toast.loading(
      "Updating tutor details..."
    );

    try {
      const res = await fetch(
        `${baseUrl}/tutors/${selectedTutor._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...selectedTutor,
            image: selectedTutor.photoUrl,
            mode: selectedTutor.teachingMode,
          }),
        }
      );

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Tutor updated successfully!", {
          id: updateToastId,
        });

        setIsModalOpen(false);

        setTutors((prev) =>
          prev.map((tutor) =>
            tutor._id === selectedTutor._id
              ? {
                  ...tutor,
                  ...selectedTutor,
                  image: selectedTutor.photoUrl,
                  mode: selectedTutor.teachingMode,
                }
              : tutor
          )
        );
      } else {
        throw new Error(result.message || "Failed to update");
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to update tutor", {
        id: updateToastId,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-500 gap-3">
        <div className="w-8 h-8 border-4 border-[#2d9282] border-t-transparent rounded-full animate-spin"></div>

        <p className="text-sm font-medium">
          Loading your added tutors...
        </p>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8 lg:py-10 px-3 sm:px-5 lg:px-6 max-w-7xl mx-auto bg-[#fcfcfc] min-h-screen relative">

      {/* HEADING */}
      <div className="mb-6 sm:mb-8 text-center md:text-left">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          My Inserted Tutors
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Manage all the tutors you have added to the platform.
        </p>
      </div>

      {/* EMPTY */}
      {tutors.length === 0 ? (
        <div className="text-center py-14 sm:py-20 bg-white rounded-2xl sm:rounded-[24px] border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-lg font-medium">
            No tutors inserted by you yet!
          </p>
        </div>
      ) : (
        <div className="w-full bg-white rounded-2xl sm:rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">

          <div className="w-full overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[800px] lg:min-w-full text-left border-collapse">

              {/* TABLE HEAD */}
              <thead>
                <tr className="border-b border-gray-100 text-xs sm:text-sm font-semibold text-gray-600 bg-gray-50/50 whitespace-nowrap">
                  <th className="py-3 sm:py-4 px-3 sm:px-6">
                    Tutor Name
                  </th>

                  <th className="py-3 sm:py-4 px-3 sm:px-6">
                    Subject
                  </th>

                  <th className="py-3 sm:py-4 px-3 sm:px-6">
                    Available
                  </th>

                  <th className="py-3 sm:py-4 px-3 sm:px-6">
                    Hourly Fee
                  </th>

                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-center">
                    Total Slot
                  </th>

                  <th className="py-3 sm:py-4 px-3 sm:px-6">
                    Registration Date
                  </th>

                  <th className="py-3 sm:py-4 px-3 sm:px-6 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-gray-50 text-sm text-gray-700">

                {tutors.map((tutor) => (
                  <tr
                    key={tutor._id}
                    className="hover:bg-gray-50/60 transition-colors duration-150"
                  >
                    <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium text-gray-900 whitespace-nowrap">
                      {tutor.name}
                    </td>

                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      {tutor.subject}
                    </td>

                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-500 max-w-[220px] truncate">
                      {tutor.available || "Not specified"}
                    </td>

                    <td className="py-3 sm:py-4 px-3 sm:px-6 font-medium">
                      ৳{tutor.hourlyFee}
                    </td>

                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-center">
                      <span className="inline-block bg-[#e6f4f1] text-[#2d9282] px-2.5 py-1 rounded-md text-xs font-bold">
                        {tutor.totalSlot || 0}
                      </span>
                    </td>

                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-500 whitespace-nowrap">
                      {tutor.createdAt
                        ? new Date(tutor.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "Recently"}
                    </td>

                    {/* ACTION */}
                    <td className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="flex items-center justify-center gap-2 sm:gap-4">

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            handleDelete(tutor._id)
                          }
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>

                        {/* EDIT */}
                        <button
                          onClick={() =>
                            openEditModal(tutor)
                          }
                          className="text-green-400 hover:text-green-600 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && selectedTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">

          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-[95%] sm:max-w-[600px] w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col">

            {/* MODAL HEADER */}
            <div className="p-4 sm:p-6 text-center border-b border-gray-50">
              <h3 className="text-xl font-bold text-gray-900">
                Book Session
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Make changes to your profile here.
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleUpdateSubmit}
              className="p-4 sm:p-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Tutor Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tutor Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={selectedTutor.name || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#2d9282]"
                  />
                </div>

                {/* Photo URL */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Photo URL
                  </label>

                  <input
                    type="text"
                    name="photoUrl"
                    value={selectedTutor.photoUrl || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#2d9282]"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Subject
                  </label>

                  <select
                    name="subject"
                    value={selectedTutor.subject || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#2d9282] bg-white"
                  >
                    <option value="Mathematics">
                      Mathematics
                    </option>

                    <option value="Physics">
                      Physics
                    </option>

                    <option value="Chemistry">
                      Chemistry
                    </option>

                    <option value="Biology">
                      Biology
                    </option>

                    <option value="English">
                      English
                    </option>
                  </select>
                </div>

                {/* Available */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Available Days & Time
                  </label>

                  <input
                    type="text"
                    name="available"
                    value={selectedTutor.available || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#2d9282]"
                  />
                </div>

                {/* Hourly Fee */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Hourly Fee
                  </label>

                  <input
                    type="number"
                    name="hourlyFee"
                    value={selectedTutor.hourlyFee || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#2d9282]"
                  />
                </div>

                {/* Total Slot */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Total Slot
                  </label>

                  <input
                    type="number"
                    name="totalSlot"
                    value={selectedTutor.totalSlot || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#2d9282]"
                  />
                </div>

                {/* Institution */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Institution
                  </label>

                  <input
                    type="text"
                    name="institution"
                    value={selectedTutor.institution || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#2d9282]"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={selectedTutor.location || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#2d9282]"
                  />
                </div>

                {/* Teaching Mode */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Teaching Mode
                  </label>

                  <select
                    name="teachingMode"
                    value={selectedTutor.teachingMode || 'Online'}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#2d9282] bg-white"
                  >
                    <option value="Online">Online</option>

                    <option value="Offline">Offline</option>
                  </select>
                </div>

                {/* Experience */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Experience
                  </label>

                  <textarea
                    name="experience"
                    value={selectedTutor.experience || ''}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#2d9282] resize-none"
                  ></textarea>
                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-gray-50">

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Confirm Booking
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mytutorpage;