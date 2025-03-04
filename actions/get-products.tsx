import { Product } from "@/types";
import qs from "query-string";


const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    colourId?: string;
    categoryId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

export const getProducts = async (query:Query): Promise<Product[]> => {
     const  url =  qs.stringifyUrl({url: URL, query:{
        colourId: query.colourId,
        categoryId: query.categoryId,
        sizeId: query.sizeId,
        isFeatured: query.isFeatured
     }})
    const res = await fetch(url)
    return res.json()
}

// Example usage of getProducts function
;