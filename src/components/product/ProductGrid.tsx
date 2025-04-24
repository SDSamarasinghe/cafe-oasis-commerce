
import React from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

interface ProductGridProps {
  products: Product[];
  featuredIds?: string[];
  columns?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  featuredIds = [], 
  columns = 4 
}) => {
  const getGridCols = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      case 4:
      default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  return (
    <div className={`grid ${getGridCols()} gap-4 md:gap-6`}>
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard 
            product={product} 
            featured={featuredIds.includes(product.id) || product.featured}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
