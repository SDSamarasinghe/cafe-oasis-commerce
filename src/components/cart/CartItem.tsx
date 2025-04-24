
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(product.id, newQuantity);
    }
  };
  
  const subtotal = product.price * quantity;
  
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="flex-shrink-0">
        <div className="w-24 h-24 overflow-hidden rounded-md">
          <img 
            src={product.image || "/placeholder.svg"} 
            alt={product.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-cafe-espresso">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          {/* Price */}
          <div className="font-semibold">${product.price.toFixed(2)}</div>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="w-8 h-8"
              onClick={() => handleQuantityChange(quantity - 1)}
              aria-label="Decrease quantity"
            >
              -
            </Button>
            
            <span className="w-8 text-center">{quantity}</span>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="w-8 h-8"
              onClick={() => handleQuantityChange(quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </Button>
          </div>
          
          {/* Remove Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => removeFromCart(product.id)}
            aria-label="Remove item"
            className="text-cafe-brown"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Item Subtotal */}
      <div className="text-right font-semibold">
        ${subtotal.toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
