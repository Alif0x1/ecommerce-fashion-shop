"use client"

import type { Product } from "@/types"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "./ui/button"
import Currency from "./ui/currency"
import useCart from "@/hooks/use-cart"

interface InfoProps {
  data: Product
}




export const Info: React.FC<InfoProps> = ({ data }) => {

  const cart = useCart()
    
  const onAddToCart = () => {
  cart.addItem(data);
  }

  return (

    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-3xl font-light text-gray-900 mb-4">{data?.name}</h1>

      <div className="flex items-baseline justify-between mb-6">
        <div>
          <p className="text-4xl font-semibold text-gray-900">
            <Currency value={data?.price} />
          </p>
          <p className="text-sm text-gray-500 mt-1">Includes all taxes and duties</p>
        </div>
        <div className="flex items-center text-green-600">
          <Check size={20} className="mr-1" />
          <span className="text-sm font-medium">In stock</span>
        </div>
      </div>
      
      <hr className="my-8 border-gray-200" />

      <div className="space-y-6 mb-8">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
          <div className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
            {data?.size?.name}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
          <div className="flex items-center space-x-2">
            <div
              className="w-6 h-6 rounded-full border border-gray-300 shadow-inner"
              style={{
                backgroundColor: data?.color?.value
              }}
            />
            <span className="text-sm text-gray-700">{data?.color?.name}</span>
          
          </div>
        </div>
      </div>

      <Button onClick={onAddToCart} className="w-full flex items-center justify-center space-x-2 py-3 px-8 bg-gray-900 text-white rounded-md transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
        <ShoppingCart size={20} />
        <span>Add to Cart</span>
      </Button>

      <div className="mt-6 text-center">
        <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          View full details
        </a>
      </div>
    </div>
  )
}

