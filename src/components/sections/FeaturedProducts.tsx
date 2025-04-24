
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/product/ProductGrid';
import { getFeaturedProducts } from '@/data/products';

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  title = "Featured Products", 
  subtitle = "Discover our most loved items", 
  limit = 4 
}) => {
  const featuredProducts = getFeaturedProducts().slice(0, limit);
  
  return (
    <section className="py-16 bg-white">
      <div className="cafe-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-cafe-espresso mb-3">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {/* Products Display */}
        <ProductGrid products={featuredProducts} />
        
        {/* View All Link */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-cafe-brown text-cafe-brown hover:bg-cafe-beige px-8">
            <Link to="/menu">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
