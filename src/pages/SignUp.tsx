
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subscribe: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      subscribe: true,
    },
  });
  
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Newsletter signup:', data);
      toast.success('Thank you for subscribing to our newsletter!');
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen py-16">
      <div className="cafe-container max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md border border-cafe-lightBrown">
          <h1 className="text-2xl font-bold mb-2 text-center text-cafe-espresso">
            Subscribe to Our Newsletter
          </h1>
          
          {submitted ? (
            <div className="text-center py-6">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-semibold mb-4">Subscription Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                You've been added to our newsletter list. Get ready for exclusive offers and updates!
              </p>
              <Button asChild className="bg-cafe-brown hover:bg-cafe-darkBrown">
                <Link to="/">
                  Return to Home
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <p className="text-center text-muted-foreground mb-6">
                Stay updated with our latest products, special offers, and events. 
                Be the first to know when we introduce new seasonal items!
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            I agree to receive marketing emails
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            You can unsubscribe at any time.
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-cafe-brown hover:bg-cafe-darkBrown"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 pt-6 border-t border-cafe-lightBrown text-center text-muted-foreground">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-cafe-brown hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
