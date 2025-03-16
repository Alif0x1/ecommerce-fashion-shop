"use client"
import { ShoppingCart, ShoppingBag } from "lucide-react"

import useCart from "@/hooks/use-cart"
import { Container } from "@/components/ui/Container"
import { Summary } from "./components/summary"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import CartItems from './components/cartItems';
import { useState } from "react"
import { useEffect } from "react"

const CartPage = () => {
  const cart = useCart()

  const [ isMounted, setIsMounted ] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <Container>
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-b pb-6">
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-x-2">
              <ShoppingCart className="h-8 w-8 text-primary" />
              Your Shopping Cart
            </h1>
            <span className="text-sm font-medium text-muted-foreground">
              {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-7 space-y-4">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center border rounded-lg bg-slate-50">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-900">Your cart is empty</h3>
                    <p className="text-muted-foreground max-w-md">
                      Looks like you havent added anything to your cart yet.
                    </p>
                  </div>
                  <Button className="mt-4">Continue Shopping</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="hidden md:flex justify-between text-sm font-medium text-muted-foreground px-4">
                    <span>Product</span>
                    <span>Quantity</span>
                  </div>
                  <ul className="divide-y border rounded-lg overflow-hidden">
                    {cart.items.map((item) => (
                      <li key={item.id}>
                        <CartItems data={item} />
                      </li>
                      
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-5 mt-8 lg:mt-0">
              <div className="sticky top-20">
                <Summary />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CartPage

