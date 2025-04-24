
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { toast } from '@/components/ui/sonner';

interface UserContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  subscribeToNewsletter: (email: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@cafe.com',
    isAdmin: true,
    subscribed: true
  },
  {
    id: 'user1',
    name: 'Regular User',
    email: 'user@example.com',
    isAdmin: false,
    subscribed: false
  }
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
      }
    }
  }, []);
  
  // Update localStorage when user changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, we'd make an API request here
    // This is just a mock implementation for demo purposes
    if (password === 'password') { // Simple password check for demo
      const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        setCurrentUser(user);
        toast.success(`Welcome back, ${user.name}!`);
        return true;
      }
    }
    toast.error('Invalid email or password');
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if email already exists
    if (MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      toast.error('An account with this email already exists');
      return false;
    }
    
    // Create new user (in a real app, this would be an API call)
    const newUser: User = {
      id: `user${Date.now()}`,
      name,
      email,
      isAdmin: false,
      subscribed: false
    };
    
    // Add to mock users (in real app, this would persist to database)
    MOCK_USERS.push(newUser);
    
    // Log the user in
    setCurrentUser(newUser);
    toast.success(`Welcome to our cafe, ${name}!`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast.info('You have been logged out');
  };
  
  const subscribeToNewsletter = async (email: string): Promise<boolean> => {
    // This would be an API call in a real app
    // For the demo, we'll just update the current user if logged in
    if (currentUser && currentUser.email === email) {
      const updatedUser = { ...currentUser, subscribed: true };
      setCurrentUser(updatedUser);
      
      // Update in mock users array
      const userIndex = MOCK_USERS.findIndex(u => u.id === currentUser.id);
      if (userIndex >= 0) {
        MOCK_USERS[userIndex] = updatedUser;
      }
      
      toast.success('You have been subscribed to our newsletter');
      return true;
    } else {
      // Handle guest subscription (would save to database in real app)
      toast.success('Thank you for subscribing to our newsletter!');
      return true;
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: !!currentUser?.isAdmin,
    login,
    signup,
    logout,
    subscribeToNewsletter
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
