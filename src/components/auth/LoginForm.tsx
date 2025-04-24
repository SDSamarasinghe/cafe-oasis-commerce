
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
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setIsSubmitting(true);
    
    try {
      const success = await login(data.email, data.password);
      if (success) {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // For demo purposes - pre-filled credentials
  const fillDemoCredentials = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      form.setValue('email', 'admin@cafe.com');
      form.setValue('password', 'password');
    } else {
      form.setValue('email', 'user@example.com');
      form.setValue('password', 'password');
    }
  };

  return (
    <div className="space-y-6">
      {/* Demo Accounts Notice */}
      <div className="bg-cafe-beige/50 p-3 rounded-md text-sm">
        <p className="font-medium text-cafe-espresso mb-2">Demo Accounts:</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            type="button" 
            size="sm" 
            variant="outline"
            onClick={() => fillDemoCredentials('admin')}
            className="text-xs border-cafe-brown text-cafe-brown"
          >
            Use Admin Account
          </Button>
          <Button 
            type="button" 
            size="sm" 
            variant="outline"
            onClick={() => fillDemoCredentials('user')}
            className="text-xs border-cafe-brown text-cafe-brown"
          >
            Use Customer Account
          </Button>
        </div>
        <p className="text-xs mt-2 text-muted-foreground">Password for demo accounts: "password"</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" className="input-field" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-cafe-brown hover:bg-cafe-darkBrown"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
