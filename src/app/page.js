import Banner from "@/Component/Banner";
import Feachercard from "@/Component/Feachercard";
import WhyChoose from "@/Component/WhyChoose";
import { featchcurse, featchuredcourse } from "@/lib/coursedata/datafetch";


export default async function  Home () {
   const courses = await featchuredcourse()

 
  return (
   <div>
   <Banner></Banner>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 py-12 justify-items-center">
  {
      courses.map(course => <Feachercard key={course?._id} course={course}></Feachercard>)
    }
</div>
   
   <WhyChoose></WhyChoose>
   </div>
  );
}


