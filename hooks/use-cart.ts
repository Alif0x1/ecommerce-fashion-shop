import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types';
import { toast } from 'react-toastify';

interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
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
                    toast('Product already in cart');
                    return;
                }

                set({ items: [...currentItems, data] });
                toast('Product added to cart');
            },
            removeItem: (id: string) => {
                set({ items: get().items.filter((item) => item.id !== id) });
                toast('Product removed from cart');
            },
            removeAll: () => {
                set({ items: [] });
                toast('Cart cleared');
            },
        }),
        {
            name: 'cart-storage', // Storage key name
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCart;
