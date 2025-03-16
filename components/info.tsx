"use client"

import type { Product } from "@/types"
import { ShoppingCart, Check, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Currency from "@/components/ui/currency"
import useCart from "@/hooks/use-cart"
import React from "react"

interface InfoProps {
  data: Product
}

interface CartItem extends Product {
  selectedSize: string | null
  quantity: number
}

export const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart()
  const [sizeOptions, setSizeOptions] = React.useState<{ value: string; stock: number }[]>([])
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null)
  const [quantity, setQuantity] = React.useState<number>(1)

  const minQuantity = 1
  const maxQuantity = 10

  React.useEffect(() => {
    try {
      const size = data.size?.size ? JSON.parse(data.size.size) : []
      if (Array.isArray(size)) {
        setSizeOptions(size)
      } else {
        console.error("Invalid size data format")
      }
    } catch (error) {
      console.error("Error parsing size data:", error)
    }
  }, [data.size?.size])

  const handleQuantityChange = (value: number) => {
    if (value >= minQuantity && value <= maxQuantity) {
      setQuantity(value)
    }
  }

  const onAddToCart = () => {
    if (selectedSize) {
      const item: CartItem = {
        ...data,
        selectedSize,
        quantity,
      }
      cart.addItem(item)
    }
  }

  const resetSelections = () => {
    setSelectedSize(null)
    setQuantity(1)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
      {/* Product Header */}
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">{data?.name}</h1>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">
              <Currency value={data?.price} />
            </p>
            <p className="text-sm text-gray-500">Includes all taxes and duties</p>
          </div>
          <div className="flex items-center text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            <Check size={16} className="mr-1.5" />
            <span className="text-sm font-medium">In stock</span>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gray-100 my-6"></div>

      {/* Size Selection */}
      <div className="space-y-6 mb-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Size</h3>
            {selectedSize && (
              <button
                onClick={resetSelections}
                className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {sizeOptions.length > 0 ? (
              sizeOptions.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size.value)}
                  className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    selectedSize === size.value
                      ? "bg-gray-900 text-white ring-2 ring-gray-900 ring-offset-1"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span>{size.value}</span>
                    <span className="text-xs mt-1 opacity-80">{size.stock} left</span>
                  </div>
                </button>
              ))
            ) : (
              <span className="text-sm text-gray-500 col-span-full">No sizes available</span>
            )}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Quantity</h3>
          <div className="flex items-center max-w-[140px]">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="w-10 h-10 flex items-center justify-center rounded-l-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={quantity <= minQuantity}
            >
              <Minus size={16} className="text-gray-600" />
            </button>
            <div className="h-10 px-4 flex items-center justify-center border-t border-b border-gray-300 bg-white">
              <span className="text-base font-medium w-6 text-center">{quantity}</span>
            </div>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-r-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50"
              disabled={quantity >= maxQuantity}
            >
              <Plus size={16} className="text-gray-600" />
            </button>
          </div>
          <p className="text-xs text-gray-500">Maximum: {maxQuantity} items</p>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={onAddToCart}
        className="w-full flex items-center justify-center space-x-2 py-6 bg-gray-900 text-white rounded-lg transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70"
        disabled={!selectedSize}
      >
        <ShoppingCart size={18} className="mr-2" />
        <span className="font-medium">{!selectedSize ? "Select a size" : "Add to Cart"}</span>
      </Button>

      {/* Description */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Product Description</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{data?.description}</p>
      </div>
    </div>
  )
}

