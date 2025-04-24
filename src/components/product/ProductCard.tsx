
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();  // Prevent navigation when clicking the button
    addToCart(product, 1);
  };
  
  return (
    <Card className={`product-card h-full flex flex-col transition-all duration-300 ${
      featured ? 'border-cafe-orange' : ''
    }`}>
      <Link to={`/product/${product.id}`}>
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-2 right-2">
            <span className="bg-cafe-orange text-white text-xs py-1 px-2 rounded-full">
              Featured
            </span>
          </div>
        )}
        
        {/* Image */}
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image || "/placeholder.svg"} 
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <CardContent className="p-4 flex-grow">
          {/* Product Category */}
          <p className="text-xs text-cafe-brown font-medium uppercase tracking-wider mb-1">
            {product.category}
          </p>
          
          {/* Product Name */}
          <h3 className="text-lg font-semibold mb-2 text-cafe-espresso">
            {product.name}
          </h3>
          
          {/* Product Description */}
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.description}
          </p>
        </CardContent>
        
        {/* Price and Add to Cart */}
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <span className="font-semibold text-cafe-espresso">
            ${product.price.toFixed(2)}
          </span>
          
          <Button 
            onClick={handleAddToCart} 
            size="sm" 
            className="bg-cafe-brown hover:bg-cafe-darkBrown"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
