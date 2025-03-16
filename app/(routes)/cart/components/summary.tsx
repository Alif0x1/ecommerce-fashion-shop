"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Package, MapPin } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Currency from "@/components/ui/currency";
import { useForm } from "react-hook-form"; // Shadcn form library
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // For validation
import useCart from "@/hooks/use-cart";


const schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  address: z.string().min(1, "Address is required"),
});

export const Summary = () => {
  const items = useCart((state) => state.items);

  // Form states
  const [deliveryCharge, setDeliveryCharge] = useState(50); // Default: Inside Dhaka
  const totalProductPrice = items.reduce((total, item) => {
    return total + Number(item.price) * (item.quantity || 1);
  }, 0);
  const totalPrice = totalProductPrice + deliveryCharge;

  // Using Shadcn form with react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  interface CheckoutData {
    fullName: string;
    phoneNumber: string;
    address: string;
  }


  const onCheckout = async (data: CheckoutData) => {
  if (!data.fullName || !data.phoneNumber || !data.address) {
    toast.error("Please fill in all the fields.");
    return;
  }


    const reqdeta = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      address: data.address,
      items,
      deliveryCharge,
      totalPrice,
    };

    console.log(reqdeta);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order`, reqdeta);
      if (response.status === 201 || response.status === 200) {
        toast.success("Order placed successfully!");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while placing the order. Please try again.");
    }
};


  return (
    <Card className="w-full max-w-lg mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-lg">Delivery Information</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Please provide your delivery details to complete your order.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Customer Information */}
        <form onSubmit={handleSubmit(onCheckout)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              {...register("fullName")}
              className="text-sm p-3"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="Enter your phone number"
              {...register("phoneNumber")}
              className="text-sm p-3"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="address">Delivery Address</Label>
            <Textarea
              id="address"
              placeholder="Enter your complete delivery address"
              {...register("address")}
              className="text-sm p-3 min-h-[100px]"
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          {/* Delivery Location */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Delivery Location</Label>
            </div>

            <RadioGroup
              defaultValue="50"
              value={deliveryCharge.toString()}
              onValueChange={(value) => setDeliveryCharge(Number(value))}
              className="space-y-2"
            >
              <div className="flex items-center gap-3 p-3 border rounded-md">
                <RadioGroupItem value="50" id="inside-dhaka" />
                <Label htmlFor="inside-dhaka" className="flex-1 cursor-pointer text-sm">
                  Inside Dhaka
                  <span className="block text-xs text-muted-foreground">Delivery Charge: 50 Taka</span>
                </Label>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-md">
                <RadioGroupItem value="100" id="outside-dhaka" />
                <Label htmlFor="outside-dhaka" className="flex-1 cursor-pointer text-sm">
                  Outside Dhaka
                  <span className="block text-xs text-muted-foreground">Delivery Charge: 100 Taka</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Order Summary */}
          <div className="rounded-md border">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">Order Summary</h3>
              </div>

              {items.length > 0 ? (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground ml-1">{item.quantity > 1 && `(x${item.quantity})`}</span>
                      </div>
                      <Currency value={Number(item.price) * (item.quantity || 1)} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Your cart is empty</p>
              )}
            </div>

            <Separator />

            <div className="p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Product Price:</span>
                <Currency value={totalProductPrice} />
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Charge:</span>
                <Currency value={deliveryCharge} />
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <Currency value={totalPrice} className="text-lg" />
              </div>
            </div>
          </div>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" disabled={items.length === 0} className="w-full" size="lg">
              Place Order
            </Button>

            <div className="text-sm text-muted-foreground text-center">
              <p>
                Payment Method: <span className="font-medium">Cash on Delivery</span>
              </p>
              <p className="mt-1">Your order will be processed immediately after submission.</p>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
