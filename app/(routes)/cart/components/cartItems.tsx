"use client"

import { Product } from '@/types'
import React from 'react'
import useCart from '@/hooks/use-cart'
import Currency from '@/components/ui/currency'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface cartProps {
  data: Product
}

const CartItems: React.FC<cartProps> = ({ data }) => {

  const cart = useCart()
  
  const onRemove = () => {
    cart.removeItem(data.id)
  }



  return (
        <li className="group relative flex gap-x-6 border-b border-border py-6 transition-colors hover:bg-accent/50">
      {/* Image Container */}
      <div className="relative aspect-square h-24 w-24 min-w-24 overflow-hidden rounded-lg border border-border bg-muted sm:h-40 sm:w-40 sm:min-w-40">
        <Image
          fill
          src={data?.images?.[0]?.url || "/placeholder.svg"}
          alt={data.name}
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="relative flex flex-1 flex-col justify-between">
        {/* Remove Button */}
        <Button
          onClick={onRemove}
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove item</span>
        </Button>

        <div className="space-y-2 pr-8 sm:pr-0">
          {/* Product Name */}
          <h3 className="font-medium text-foreground">{data.name}</h3>

          {/* Product Details */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{data.colour.name}</span>
            <span className="h-4 w-px bg-border" aria-hidden="true" />
            <span>{data.size.name}</span>
          </div>

          {/* Price */}
          <div className="flex items-end justify-between gap-2">
            <Currency value={data.price} />
          </div>
        </div>
        
      </div>
    </li>
  )
}

export default CartItems
