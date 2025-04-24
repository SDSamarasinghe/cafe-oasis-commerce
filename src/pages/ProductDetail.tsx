
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = id ? getProductById(id) : undefined;
  
  if (!product) {
    return (
      <div className="cafe-container py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/menu')}>
          Back to Menu
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="cafe-container">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src={product.image || "/placeholder.svg"} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            {/* Category */}
            <div className="flex items-center gap-4">
              <Badge className="bg-cafe-brown">{product.category}</Badge>
              {product.featured && <Badge className="bg-cafe-orange">Featured</Badge>}
            </div>
            
            {/* Name and Description */}
            <h1 className="text-3xl md:text-4xl font-bold text-cafe-espresso">
              {product.name}
            </h1>
            
            <p className="text-lg text-muted-foreground">
              {product.description}
            </p>
            
            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Price and Add to Cart */}
            <div className="pt-6 border-t border-cafe-lightBrown">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-cafe-espresso">
                  ${product.price.toFixed(2)}
                </span>
                
                <Button 
                  onClick={handleAddToCart}
                  className="bg-cafe-brown hover:bg-cafe-darkBrown"
                  disabled={!product.isAvailable}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
