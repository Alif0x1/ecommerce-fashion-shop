import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types';
import { toast } from 'react-toastify';

interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    updateItem: (id: string, updates: Partial<Product>) => void;
    removeAll: () => void;
}

const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (data: Product) => {
                const currentItems = get().items;
                const isExist = currentItems.find((item) => item.id === data.id);

                if (isExist) {
                    toast('Product already in cart', {
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        position: "top-center",
                        style: {
                            fontSize: "1rem", // Optimal font size for mobile and desktop
                            padding: "1rem", // Adequate padding for better touch interaction
                            width: "16rem", // Adjust width for better aesthetics
                            backgroundColor: "#ff6f61", // Soft red color for attention
                            color: "#fff", // White text for contrast
                            borderRadius: "8px", // Rounded corners for a modern feel
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
                            fontWeight: "500", // Semi-bold for emphasis
                            textAlign: "center", // Centered text alignment
                            display: "flex", // Flexbox for better layout
                            alignItems: "center", // Align the text and check mark
                            justifyContent: "center", // Center the content
                            gap: "8px", // Space between the check mark and text
                        },
                        className: "toast-mobile", // Custom class for additional styling
                    });
                    return;
                }

                set({ items: [...currentItems, data] });
                toast('Product added to cart' ,{
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        position: "top-center",
        style: {
            fontSize: "1rem", // Optimal font size for mobile and desktop
            padding: "1rem", // Adequate padding for better touch interaction
            width: "16rem", // Adjust width for better aesthetics
            backgroundColor: "#7fa6f0", // Soft red color for attention
            color: "#fff", // White text for contrast
            borderRadius: "8px", // Rounded corners for a modern feel
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
            fontWeight: "500", // Semi-bold for emphasis
            textAlign: "center", // Centered text alignment
            display: "flex", // Flexbox for better layout
            alignItems: "center", // Align the text and check mark
            justifyContent: "center", // Center the content
            gap: "8px", // Space between the check mark and text
        },
        className: "toast-mobile", // Custom class for additional styling
    });
            },
            removeItem: (id: string) => {
                set({ items: get().items.filter((item) => item.id !== id) });
                toast('Product removed from cart',  {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        position: "top-center",
        style: {
            fontSize: "1rem", // Optimal font size for mobile and desktop
            padding: "1rem", // Adequate padding for better touch interaction
            width: "16rem", // Adjust width for better aesthetics
            backgroundColor: "#ff6f61", // Soft red color for attention
            color: "#fff", // White text for contrast
            borderRadius: "8px", // Rounded corners for a modern feel
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
            fontWeight: "500", // Semi-bold for emphasis
            textAlign: "center", // Centered text alignment
            display: "flex", // Flexbox for better layout
            alignItems: "center", // Align the text and check mark
            justifyContent: "center", // Center the content
            gap: "8px", // Space between the check mark and text
        },
        className: "toast-mobile", // Custom class for additional styling
    });
            },
            updateItem: (id: string, updates: Partial<Product>) => {
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, ...updates } : item
                    ),
                });
            },
            removeAll: () => {
                set({ items: [] });
                toast('Cart cleared',  {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        position: "top-center",
        style: {
            fontSize: "1rem", // Optimal font size for mobile and desktop
            padding: "1rem", // Adequate padding for better touch interaction
            width: "16rem", // Adjust width for better aesthetics
            backgroundColor: "#ff6f61", // Soft red color for attention
            color: "#fff", // White text for contrast
            borderRadius: "8px", // Rounded corners for a modern feel
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
            fontWeight: "500", // Semi-bold for emphasis
            textAlign: "center", // Centered text alignment
            display: "flex", // Flexbox for better layout
            alignItems: "center", // Align the text and check mark
            justifyContent: "center", // Center the content
            gap: "8px", // Space between the check mark and text
        },
        className: "toast-mobile", // Custom class for additional styling
    });
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCart;
