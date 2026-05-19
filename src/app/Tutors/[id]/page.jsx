import Image from "next/image";


const getdealiesdata = async (id)=>{
    const res = await fetch(`${process.env.NEXT_PUBLUC_URL}/Tutors/${id}`)
    const data = res.json()
    return data
}

const Tutorsdeliesspage = async ({params}) => {
    const {id} = await params
    const data = await getdealiesdata(id)
  
    return (
        <div>
           <div className="w-full max-w-[950px] bg-white rounded-[24px] border border-gray-100 shadow-md p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start transition-transform duration-200 hover:-translate-y-0.5 mx-auto">
      
      {/* Left side: Image container */}
      <div className="w-full md:w-[45%] h-[240px] sm:h-[300px] md:h-[340px] relative overflow-hidden rounded-[16px]">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 450px"
          priority
        />
      </div>

      {/* Right side: Information block */}
      <div className="w-full md:w-[55%] flex flex-col justify-between h-full font-sans">
        <div>
          {/* Header */}
          <h2 className="m-0 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{data.name}</h2>
          <p className="mt-1 mb-5 text-sm sm:text-base text-gray-400 font-medium">{data.subject}</p>

          {/* Details List */}
          <div className="space-y-2.5 text-[14px] sm:text-[15px] text-gray-800 leading-relaxed">
            <p>
              <span className="font-bold text-gray-900">Institution:</span> {data.subject}
            </p>
            <p>
              <span className="font-bold text-gray-900">Experience:</span> experience
            </p>
            <p>
              <span className="font-bold text-gray-900">Location:</span> location
            </p>
            <p>
              <span className="font-bold text-gray-900">Mode:</span> mode
            </p>
            <p>
              <span className="font-bold text-gray-900">Available & Time Slot:</span> availableSlots
            </p>
            <p>
              <span className="font-bold text-gray-900">Hourly Fee:</span> {data.fee}
            </p>
            <p>
              <span className="font-bold text-gray-900">Remaining Slots:</span> remainingSlots
            </p>
            <p className="break-all sm:break-normal">
              <span className="font-bold text-gray-900">Session Start Date:</span> {data.sessionStartDate}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button
            className="bg-[#2d9282] px-4 hover:bg-[#227064] text-white py-3 rounded-lg text-15px font-medium transition-colors duration-200 text-[14px] font-medium rounded-lg shadow-sm transition-colors duration-200"
            // onClick={() => alert(`Booking a session with ${data.name}`)}
          >
            Book Session
          </button>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Tutorsdeliesspage;