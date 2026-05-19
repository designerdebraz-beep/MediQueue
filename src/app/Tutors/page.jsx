import Coursecard from '@/Component/Course';
import { featchAllCourse, featchcurse, featchuredcourse } from '@/lib/coursedata/datafetch';
import Image from 'next/image';
import React from 'react';



const TutorsPage = async () => {
    const courses = await featchAllCourse()
    

    return (


        <div>
            <h2 className='font-bold text-3xl px-7 py-4'>All Tutors</h2>
            <div className='grid grid-cols-3 px-16 py-12'>
          
        {
            courses.map(course => <Coursecard key={course._id} course={course}></Coursecard>)
        }
         
        </div>
        </div>
    );
};

export default TutorsPage;