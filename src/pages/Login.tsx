
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/contexts/UserContext';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Login = () => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('login');
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSuccess = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen py-16">
      <div className="cafe-container max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md border border-cafe-lightBrown">
          <h1 className="text-2xl font-bold mb-6 text-center text-cafe-espresso">
            Welcome to Oasis Cafe
          </h1>
          
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm onSuccess={handleSuccess} />
              
              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setActiveTab('register')}
                    className="text-cafe-brown hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm onSuccess={handleSuccess} />
              
              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <button 
                    onClick={() => setActiveTab('login')}
                    className="text-cafe-brown hover:underline font-medium"
                  >
                    Login
                  </button>
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Guest Checkout Notice */}
          <div className="mt-8 pt-6 border-t border-cafe-lightBrown text-center">
            <p className="text-muted-foreground mb-4">
              Just browsing? You can still place orders as a guest.
            </p>
            <Button 
              asChild
              variant="outline" 
              className="w-full border-cafe-brown text-cafe-brown hover:bg-cafe-beige"
            >
              <Link to="/menu">
                Continue as Guest
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
