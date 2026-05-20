import { WithForm } from "@/Component/WithForm";
import { Button } from "@heroui/react";
import Image from "next/image";

const getdealiesdata = async (id) => {
 
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/tutors/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error(`Fetching failed for ID: ${id}, Status: ${res.status}`);
    return null; 
  }

  return res.json();
};

const Tutorsdeliesspage = async ({ params }) => {
  const { id } = await params;
  const data = await getdealiesdata(id);

 
  if (!data) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500">Tutor Not Found!</h2>
        <p className="text-gray-500 mt-2">Could not load details for tutor ID: {id}</p>
      </div>
    );
  }
 
  return (
    <div className="py-10 px-4">
      <div className="w-full max-w-[950px] bg-white rounded-[24px] border border-gray-100 shadow-md p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start transition-transform duration-200 hover:-translate-y-0.5 mx-auto">
        
        {/* Left Side Image */}
        <div className="w-full md:w-[45%] h-[240px] sm:h-[300px] md:h-[340px] relative overflow-hidden rounded-[16px]">
          {data.image && (
            <Image
              src={data.image}
              alt={data.name || "Tutor Image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 450px"
              priority
            />
          )}
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-[55%] flex flex-col justify-between h-full">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {data.name}
            </h2>

            <p className="mt-1 mb-5 text-gray-500">
              {data.subject}
            </p>

            <div className="space-y-2 text-gray-800">
              <p>
                <span className="font-bold">Institution:</span>{" "}
                {data.institution}
              </p>

              <p>
                <span className="font-bold">Experience:</span>{" "}
                {data.experience}
              </p>

              <p>
                <span className="font-bold">Qualification:</span>{" "}
                {data.qualification}
              </p>

              <p>
                <span className="font-bold">Location:</span>{" "}
                {data.location}
              </p>

              <p>
                <span className="font-bold">Mode:</span>{" "}
                {data.mode}
              </p>

              <p>
                <span className="font-bold">Available:</span>{" "}
                {data.available}
              </p>

              <p>
                <span className="font-bold">Hourly Fee:</span>{" "}
                {data.hourlyFee}
              </p>

              <p>
                <span className="font-bold">Remaining Slots:</span>{" "}
                {data.remainingSlots}
              </p>

              <p>
                <span className="font-bold">Rating:</span>{" "}
                {data.rating}
              </p>

              <p>
                <span className="font-bold">Session Start Date:</span>{" "}
                {data.sessionStartDate}
              </p>
            </div>
          </div>

          <div className="mt-8">
           
            <WithForm tutorId={data._id || data.id} remainingSlots={data.remainingSlots}></WithForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorsdeliesspage;