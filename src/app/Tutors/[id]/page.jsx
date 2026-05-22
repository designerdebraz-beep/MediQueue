import { WithForm } from "@/Component/WithForm";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";


const getdealiesdata = async (id, token) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  console.log("Sending Token to Backend:", token); 
  
  try {
    const res = await fetch(`${baseUrl}/tutors/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "authorization": `Bearer ${token}` } : {})
      },
      cache: "no-store", 
    });

    if (!res.ok) {
      console.error(`Fetching failed for ID: ${id}. Response Status: ${res.status}`);
      return null; 
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch API Connection Error:", error);
    return null;
  }
};


export async function generateMetadata({ params }) {
  const { id } = await params;
  
  
  let newtoken = null;
  try {
    const { token } = await auth.api.getToken({
      headers: await headers()
    });
    newtoken = token;
  } catch (authError) {
    console.error("Auth Session Fetch Error in Metadata:", authError);
  }

  const data = await getdealiesdata(id, newtoken);

 
  if (data && data.name) {
    return {
      title: `${data.name} - Expert Tutor Details`,
      description: `Learn ${data.subject || 'Medical Science'} from ${data.name}. Book your slot now!`,
    };
  }

  return {
    title: "Tutor Details Not Found | MediQueue",
  };
}


const Tutorsdeliesspage = async ({ params }) => {
  const { id } = await params;
  
  let newtoken = null;
  try {
    const { token } = await auth.api.getToken({
      headers: await headers()
    });
    console.log(token);
    newtoken = token;
  } catch (authError) {
    console.error("Auth Session Fetch Error:", authError);
  }
  
  const data = await getdealiesdata(id, newtoken);
  
  if (!data) {
    return (
      <div className="py-24 text-center">
        <div className="inline-flex p-4 bg-red-50 text-red-500 rounded-full mb-4">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Tutor Not Found!</h2>
        <p className="text-gray-500 mt-2">Could not load details for tutor ID: {id}</p>
      </div>
    );
  }
 
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="w-full max-w-[950px] bg-white rounded-[24px] border border-gray-100 shadow-md p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start transition-all duration-300 hover:shadow-lg mx-auto">
        
        {/* Left Side Image */}
        <div className="w-full md:w-[45%] h-[240px] sm:h-[300px] md:h-[340px] relative overflow-hidden rounded-[16px] bg-gray-50 border border-gray-100">
          {data.image ? (
            <Image
              src={data?.image}
              alt={data?.name || "Tutor Image"}
              width={500}
              height={600}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 450px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              No Profile Image
            </div>
          )}
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-[55%] flex flex-col justify-between min-h-[340px]">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2d9282] bg-[#2d9282]/10 px-3 py-1 rounded-md">
                {data?.subject}
              </span>
              <span className="text-sm font-semibold text-gray-500">
                ⭐ {data?.rating || "N/A"}
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
              {data.name}
            </h2>

            <div className="mt-6 space-y-3 text-sm text-gray-600 border-t border-gray-50 pt-4">
              <p><span className="font-bold text-gray-800">Institution:</span> {data.institution}</p>
              <p><span className="font-bold text-gray-800">Qualification:</span> {data.qualification || "Not Specified"}</p>
              <p><span className="font-bold text-gray-800">Location:</span> {data.location}</p>
              <p>
                <span className="font-bold text-gray-800">Mode:</span>{" "}
                <span className="capitalize px-2 py-0.5 bg-gray-100 rounded text-xs font-semibold">{data.mode}</span>
              </p>
              <p><span className="font-bold text-gray-800">Available Days:</span> {data.available}</p>
              <p>
                <span className="font-bold text-gray-800">Hourly Fee:</span>{" "}
                <span className="text-[#2d9282] font-bold text-base">{data.hourlyFee}</span>
              </p>
              <p>
                <span className="font-bold text-gray-800">Remaining Slots:</span>{" "}
                <span className={`font-bold ${data.remainingSlots > 0 ? 'text-gray-900' : 'text-red-500'}`}>
                  {data.remainingSlots ?? 0}
                </span>
              </p>
              <p><span className="font-bold text-gray-800">Session Starts:</span> {data.sessionStartDate || "Immediate"}</p>
              <p className="text-xs italic text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-100">{data.experience}</p>
            </div>
          </div>

          {/* Booking Form Integration */}
          <div className="mt-8 pt-4 border-t border-gray-100">
            <WithForm tutorId={data._id || data.id} remainingSlots={data.remainingSlots}></WithForm>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Tutorsdeliesspage;