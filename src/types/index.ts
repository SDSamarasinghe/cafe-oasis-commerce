
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'food' | 'dessert' | 'merchandise';
  image: string;
  featured?: boolean;
  ingredients?: string[];
  isAvailable: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  address?: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  subscribed: boolean;
}
