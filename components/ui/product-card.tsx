"use client"

import type React from "react"
import type { Product } from "@/types"
import Image from "next/image"
import { Expand, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { type MouseEventHandler } from "react"
import Currency from "./currency"
import usePreviewModal from "@/hooks/use-preview-modal"
import useCart from "@/hooks/use-cart"
import useMobile from "@/hooks/use-mobile"
import IconButton from './IconButoon';

interface ProductCardProps {
  data: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter()
  const cart = useCart()
  const previewModal = usePreviewModal()
  const isMobile = useMobile()
  
  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    previewModal.onOpen(data)
  }
  
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()

    const selectedSize = 'M'
    const quantity = 1
    const item = {
      ...data,
      selectedSize,
      quantity
    }
    cart.addItem(item)
  }
  
  const handleClick = () => {
    router.push(`/product/${data?.id}`)
  }
  
  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg relative"
    >
      {/* Product Image */}
      <div className="relative aspect-square">
        <Image
          src={data?.images[0]?.url || "/placeholder.svg?height=400&width=400"}
          alt={data?.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {/* Product Details */}
      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-1">{data?.name}</h3>
        <p className="text-xs md:text-sm font-medium text-gray-500 mb-2">{data?.category?.name}</p>
        
        {/* Price and Actions */}
        <div className="flex items-center justify-between mt-1">
          <Currency value={data?.price} />
          
          {isMobile ? (
            // Mobile: Compact button layout
            <button
              onClick={onAddToCart}
              className="text-xs bg-primary text-white p-2 rounded-full flex items-center justify-center shadow-md"
            >
              <ShoppingCart size={16} />
            </button>
          ) : (
            <div className="flex space-x-2">
              <IconButton
                onClick={onPreview}
                icon={<Expand size={16} />}
                className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition"
              />
              <IconButton
                onClick={onAddToCart}
                icon={<ShoppingCart size={16} />}
                className="bg-primary text-white rounded-full p-2 hover:bg-primary/90 transition"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Preview overlay for desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-3">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-800" />}
              className="bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all duration-200"
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-800" />}
              className="bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all duration-200"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductCard