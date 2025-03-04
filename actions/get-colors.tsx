import { Color } from "@/types";



const URL = `${process.env.NEXT_PUBLIC_API_URL}/colours`;

export const getColors = async ():Promise<Color[]> => {
    const res = await fetch(URL)

    return res.json()
}