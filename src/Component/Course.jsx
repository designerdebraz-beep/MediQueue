import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Coursecard = ({course}) => {
    const {_id, name, subject,available, sessionStartDate,fee,image }= course
    return (

      
        
        <div>
           
            <div className="flex flex-col w-[320px] bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden transition-transform duration-200 hover:-translate-y-0.5">
                {/* Image Wrap */}
                <Link href={`/tutors/${_id}`}>
                <div className="w-full h-[180px] p-3 box-border">
                    <div className="relative w-full h-full overflow-hidden rounded-[12px]">
                        <Image
                            src={image}
                            alt={name}
                           fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 320px"
                            priority
                        />
                    </div>
                </div>
                </Link>

                {/* Content */}
                <div className="flex flex-col p-5 flex-grow">
                    <h3 className="m-0 text-xl font-bold text-gray-900 font-serif">{name}</h3>

                    <p className="mt-1 mb-4 text-sm text-gray-500 font-sans">{subject}</p>

                    {/* Details */}
                    <div className="flex-grow space-y-1.5 mb-6 text-[14px] leading-relaxed text-gray-700">
                        <p>
                            <span className="font-semibold text-gray-800">Available:</span>{available}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Session Start Date:</span>
                            {sessionStartDate}
                        </p>
                        <p>
                            <span className="font-semibold text-gray-800">Fee:</span> {fee}
                        </p>
                    </div>

                    {/* Action Button */}
                       <Link href={`/tutors/${_id}`}>
                    <button
                        className="w-full bg-[#2d9282] hover:bg-[#227064] text-white py-3 rounded-lg text-[15px] font-medium transition-colors duration-200 cursor-pointer"
                    //   onClick={() => alert(`Booking a session with `)}
                    >
                        Book Session
                    </button>
                    </Link>
                </div>
            </div>
        </div>
       
    );
};

export default Coursecard;