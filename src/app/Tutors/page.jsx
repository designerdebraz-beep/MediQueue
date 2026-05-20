"use client";

import Coursecard from '@/Component/Course';
import { featchAllCourse } from '@/lib/coursedata/datafetch';
import React, { useEffect, useState } from 'react';

const TutorsPage = () => {

    // State
    const [courses, setCourses] = useState([]);
    const [searchText, setSearchText] = useState("");

    // Fetch Courses
    useEffect(() => {

        const loadCourses = async () => {
            const data = await featchAllCourse();
            setCourses(data);
        };

        loadCourses();

    }, []);

    // Filter Courses
    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchText.toLowerCase()) ||
        course.subject.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>

            {/* Heading */}
            <h2 className='font-bold text-3xl px-7 py-4'>
                All Tutors
            </h2>

            {/* Search Input */}
            <div className='px-7 mb-8'>
                <input
                    type="text"
                    placeholder="Search tutor or subject..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className='w-full md:w-[400px] px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#2d9282]'
                />
            </div>

            {/* Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-16 py-12'>

                {
                    filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <Coursecard
                                key={course._id}
                                course={course}
                            />
                        ))
                    ) : (
                        <div className='col-span-3 text-center text-xl text-gray-500'>
                            No tutor found
                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default TutorsPage;