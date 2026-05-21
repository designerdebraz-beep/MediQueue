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

