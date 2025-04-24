
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { toast } from '@/components/ui/sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  address: z.string().min(10, { message: 'Please enter your full address' }),
  notes: z.string().optional(),
  subscribe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutForm: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { currentUser, subscribeToNewsletter } = useUser();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Pre-fill form if user is logged in
  const defaultValues: Partial<FormValues> = {
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    subscribe: false,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(async () => {
      try {
        // Handle newsletter subscription
        if (data.subscribe) {
          await subscribeToNewsletter(data.email);
        }
        
        // Clear cart and navigate to success page
        clearCart();
        navigate('/checkout-success');
        
      } catch (error) {
        console.error('Checkout failed', error);
        toast.error('There was a problem processing your order. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-cafe-espresso">Contact Information</h3>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="input-field" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" className="input-field" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Delivery Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-cafe-espresso">Delivery Information</h3>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Address</FormLabel>
                <FormControl>
                  <Textarea {...field} className="input-field h-20" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Notes (optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} className="input-field h-20" placeholder="Special instructions for your order..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Newsletter Subscription */}
        <FormField
          control={form.control}
          name="subscribe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Subscribe to newsletter
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Get exclusive offers and updates from our cafe
                </p>
              </div>
            </FormItem>
          )}
        />
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-cafe-brown hover:bg-cafe-darkBrown"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : `Complete Order (${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice)})`}
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
