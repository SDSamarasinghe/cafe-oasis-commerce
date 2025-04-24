
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="cafe-container">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-cafe-espresso">Your Cart</h1>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="md:col-span-2 space-y-4">
              {items.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            
            {/* Cart Summary */}
            <div>
              <CartSummary onCheckout={handleCheckout} />
              
              <div className="mt-6">
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full border-cafe-brown text-cafe-brown hover:bg-cafe-beige"
                >
                  <Link to="/menu">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto text-cafe-brown opacity-50 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild className="bg-cafe-brown hover:bg-cafe-darkBrown">
              <Link to="/menu">
                Browse Our Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
