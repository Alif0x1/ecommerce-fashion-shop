import React from 'react';
import { Product } from '@/types';
import NoResults from './ui/NoResults';
import ProductCard from './ui/product-card';


interface ProductListProps {
  title: string;
  items: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-2xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      {items.length > 0 && ( // Conditionally render the grid only if there are items
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <ProductCard key={item.id}  data={item} /> // Use ProductCard and pass 'product' prop
          ))}
        </div>
      )}
    </div>
  );
};
