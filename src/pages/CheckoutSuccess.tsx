
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Check } from 'lucide-react';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  
  // Generate a random order number
  const orderNumber = React.useMemo(() => {
    return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);
  
  // If someone navigates directly to this page without checkout, redirect to home
  useEffect(() => {
    if (items.length > 0) {
      // User still has items in cart, which means they didn't come from checkout
      navigate('/');
    }
  }, [items, navigate]);
  
  return (
    <div className="min-h-screen py-16">
      <div className="cafe-container max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cafe-espresso">
          Order Confirmed!
        </h1>
        
        <p className="text-xl mb-2">
          Thank you for your order
        </p>
        
        <p className="text-muted-foreground mb-8">
          Your order #{orderNumber} has been placed and is being processed.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-cafe-lightBrown mb-8">
          <h2 className="text-lg font-semibold mb-4">What happens next?</h2>
          
          <div className="space-y-4 text-left">
            <div className="flex gap-4">
              <div className="bg-cafe-beige rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold">Order Processing</h3>
                <p className="text-muted-foreground">
                  Our team is preparing your order for pickup or delivery.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-cafe-beige rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold">Order Ready</h3>
                <p className="text-muted-foreground">
                  You'll receive a notification when your order is ready.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-cafe-beige rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold">Enjoy!</h3>
                <p className="text-muted-foreground">
                  Savor your delicious coffee and treats from Oasis Cafe.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-cafe-brown hover:bg-cafe-darkBrown">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="border-cafe-brown text-cafe-brown hover:bg-cafe-beige">
            <Link to="/menu">
              Order More
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
