
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CartSummaryProps {
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { totalItems, totalPrice, items } = useCart();
  
  // Calculate subtotal, tax, and final total
  const subtotal = totalPrice;
  const tax = subtotal * 0.1; // 10% tax rate for demo
  const total = subtotal + tax;
  
  return (
    <Card className="border-cafe-lightBrown">
      <CardHeader>
        <CardTitle className="text-cafe-espresso">Order Summary</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {/* Items Count */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Items</span>
            <span>{totalItems}</span>
          </div>
          
          {/* Subtotal */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          {/* Tax */}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <Separator className="my-4" />
          
          {/* Total */}
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onCheckout}
          className="w-full bg-cafe-brown hover:bg-cafe-darkBrown"
          disabled={totalItems === 0}
        >
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
