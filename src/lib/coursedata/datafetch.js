export const featchAllCourse = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/tutors`)
    const data = await res.json()
    return data
}
export const featchuredcourse = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/featured`)
    const data = await res.json()
    return data
}

// export const featchuredcourse = async () => {
//     // ব্যাকএন্ড ইউআরএল ব্যাকআপসহ ডিফাইন করা
//     const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:8080";

//     try {
//         const res = await fetch(`${baseUrl}/featured`, {
//             cache: "no-store", // ডাটা ক্যাশ হওয়া আটকাতে
//         });

//         if (!res.ok) {
//             console.error(`Failed to fetch featured tutors. Status: ${res.status}`);
//             return []; // ক্র্যাশ এড়াতে খালি অ্যারে ব্যাকআপ
//         }

//         const data = await res.json();
//         return data;
//     } catch (error) {
//         console.error("Error in featchuredcourse fetch:", error);
//         return []; // কানেকশন ফেইল করলেও যেন পেজ ভেঙে না যায়
//     }
// };

