
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';

import { Menu, User, ShoppingCart } from 'lucide-react';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, isAdmin, currentUser, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="cafe-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-cafe-espresso">
              Oasis <span className="text-cafe-brown">Cafe</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="navbar-link font-medium">Home</Link>
            <Link to="/menu" className="navbar-link font-medium">Menu</Link>
            <Link to="/about" className="navbar-link font-medium">About</Link>
            <Link to="/contact" className="navbar-link font-medium">Contact</Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Cart Button */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-cafe-espresso">
                <ShoppingCart />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-cafe-brown text-white text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Button/Login */}
            {isAuthenticated ? (
              <div className="relative group">
                <Button variant="ghost" size="icon" className="text-cafe-espresso">
                  <User />
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 hidden group-hover:block">
                  <p className="px-4 py-2 text-sm font-semibold text-cafe-espresso border-b">
                    {currentUser?.name}
                  </p>
                  {isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-cafe-brown hover:bg-cafe-beige">
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={logout} 
                    className="w-full text-left px-4 py-2 text-sm text-cafe-brown hover:bg-cafe-beige"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="border-cafe-brown text-cafe-brown hover:bg-cafe-beige">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-cafe-espresso">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <Link to="/" className="text-lg font-medium py-2">Home</Link>
                  <Link to="/menu" className="text-lg font-medium py-2">Menu</Link>
                  <Link to="/about" className="text-lg font-medium py-2">About</Link>
                  <Link to="/contact" className="text-lg font-medium py-2">Contact</Link>

                  <div className="h-px bg-cafe-lightBrown my-2" />

                  {isAdmin && (
                    <Link to="/admin" className="text-lg font-medium py-2 text-cafe-brown">
                      Admin Dashboard
                    </Link>
                  )}
                  
                  {isAuthenticated ? (
                    <Button onClick={logout} variant="outline" className="mt-2">
                      Logout
                    </Button>
                  ) : (
                    <Button asChild variant="default" className="mt-2 bg-cafe-brown">
                      <Link to="/login">Login / Register</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
