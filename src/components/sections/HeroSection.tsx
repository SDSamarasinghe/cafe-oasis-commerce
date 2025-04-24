
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-cafe-beige relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/cafe-bg.jpg')] bg-cover bg-center opacity-30 z-0" />
      
      <div className="cafe-container relative z-10 py-20 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cafe-espresso mb-6 leading-tight">
            Welcome to <span className="text-cafe-brown">Oasis Cafe</span>
          </h1>
          
          <p className="text-lg md:text-xl text-cafe-espresso/80 mb-8">
            Where every cup tells a story and every bite brings comfort.
            Experience the perfect blend of flavor and atmosphere.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-cafe-brown hover:bg-cafe-darkBrown text-white px-8 py-6">
              <Link to="/menu">
                View Our Menu
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-cafe-brown text-cafe-brown hover:bg-cafe-beige px-8 py-6">
              <Link to="/about">
                About Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
