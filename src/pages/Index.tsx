
import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* About Section */}
      <section className="py-16 bg-cafe-beige/30">
        <div className="cafe-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-cafe-espresso mb-6">
                Our Story
              </h2>
              <p className="text-lg mb-4 text-cafe-espresso/80">
                Oasis Cafe was born from a passion for exceptional coffee and a desire to create a warm, 
                inviting space where people could gather, connect, and enjoy moments of tranquility 
                in the midst of busy lives.
              </p>
              <p className="text-lg mb-6 text-cafe-espresso/80">
                Every cup we serve is crafted with care, using ethically sourced beans and 
                brewing methods that bring out the unique flavor profiles. Our food menu features 
                locally sourced ingredients whenever possible, supporting our community while 
                delighting your taste buds.
              </p>
              <Button asChild className="bg-cafe-brown hover:bg-cafe-darkBrown">
                <Link to="/about">
                  Learn More About Us
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src="/cafe-interior.jpg" 
                alt="Cafe Interior" 
                className="rounded-lg shadow-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cafe-orange rounded-lg hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-cafe-brown text-white">
        <div className="cafe-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Subscribe to our newsletter to receive updates on new products, special offers,
            and upcoming events. Be the first to know about seasonal specials!
          </p>
          <Button asChild variant="outline" className="border-white text-white hover:bg-cafe-darkBrown">
            <Link to="/signup">
              Sign Up Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
