
import React, { useState } from 'react';
import { products, getProductsByCategory } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'coffee', name: 'Coffee' },
  { id: 'food', name: 'Food' },
  { id: 'dessert', name: 'Desserts' },
  { id: 'merchandise', name: 'Merchandise' },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : getProductsByCategory(activeCategory as any);
  
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-cafe-beige py-12 md:py-20">
        <div className="cafe-container">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-cafe-espresso mb-6">
            Our Menu
          </h1>
          <p className="text-center text-lg max-w-2xl mx-auto text-cafe-espresso/80">
            Discover our selection of carefully crafted coffees, delicious food, and specialty items.
          </p>
        </div>
      </div>
      
      {/* Category Filters */}
      <div className="bg-white py-6 border-b border-cafe-lightBrown sticky top-16 z-10">
        <div className="cafe-container">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category.id)}
                className={activeCategory === category.id 
                  ? 'bg-cafe-brown hover:bg-cafe-darkBrown' 
                  : 'border-cafe-brown text-cafe-brown hover:bg-cafe-beige'
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <div className="py-12 bg-white">
        <div className="cafe-container">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
