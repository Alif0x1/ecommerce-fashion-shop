/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import type React from "react"
import type { Product } from "@/types"
import Image from "next/image"
import { Expand, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import Currency from "./currency"
import IconButton from "./IconButoon"
import usePreviewModal from "@/hooks/use-preview-modal"
import { MouseEventHandler } from "react"
import useCart from "@/hooks/use-cart"

interface ProductCardProps {
  data: Product

}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter()
  const cart = useCart()
  const   PreviewModal = usePreviewModal();

  const onPreview: MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent) => {
    e.stopPropagation()
    PreviewModal.onOpen(data)
    console.log("Preview "+ data)
  }

  const onAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log("Add to Cart")
    cart.addItem(data)
  }

  const handleClick = () => {
    router.push(`/product/${data?.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
    >
      {/* Product Image Container */}
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={data?.images[0].url || "/placeholder.svg"}
          alt={data?.name}
          width={400}
          height={400}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-4">
            <IconButton
            // @ts-ignore
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-800" />}
              className="bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all duration-200"
            />
            <IconButton
            // @ts-ignore
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-800" />}
              className="bg-white text-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{data?.name}</h3>
            <p className="text-sm font-medium text-gray-500">{data?.category.name}</p>
          </div>
          <Currency value={data?.price} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard

