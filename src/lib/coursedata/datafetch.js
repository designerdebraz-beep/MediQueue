export const featchAllCourse = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLUC_URL}/tutors`)
    const data = await res.json()
    return data
}
export const featchuredcourse = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLUC_URL}/featured`)
    const data = await res.json()
    return data
}