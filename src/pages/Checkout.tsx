
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import CartSummary from '@/components/cart/CartSummary';

const Checkout = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  
  // Redirect to cart if cart is empty
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);
  
  if (items.length === 0) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="min-h-screen py-12">
      <div className="cafe-container">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-cafe-espresso">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-cafe-lightBrown">
              <CheckoutForm />
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <CartSummary />
            
            <div className="mt-6 p-4 bg-cafe-beige/50 rounded-lg">
              <h3 className="font-semibold mb-2">Notes:</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• This is a demo checkout. No real payments will be processed.</li>
                <li>• For testing, any valid email format will work.</li>
                <li>• Order details will be stored locally.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
