export interface Billboard {
    id : string,
    label: string,
    imageUrl:string
}

export interface Category {
    id: string,
    name: string,
    billboard:Billboard ,
}




export interface Size {
  id: string;
  storeId: string;
  name: string;
  size: string;
  createdAt: string;
  updatedAt: string;

}
  

export interface Color {
  id: string
  name: string
  value: string
}

export interface Product {
  id: string
  category: Category
  name: string
  price: string
  isFeatured: boolean
  size: Size
   colour: Color
  description: string
  images: Image[]
  
}


export interface Image {
  id: string
  url: string
}