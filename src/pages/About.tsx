
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-cafe-beige py-16">
        <div className="cafe-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-cafe-espresso mb-6">
            About Oasis Cafe
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-cafe-espresso/80">
            A sanctuary for coffee lovers and a haven for those seeking a moment of peace in their busy day.
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <section className="py-16">
        <div className="cafe-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-cafe-espresso mb-6">
                Our Story
              </h2>
              <p className="mb-4 text-lg">
                Oasis Cafe was founded in 2010 with a simple mission: to create a warm, 
                inviting space where quality coffee meets exceptional service.
              </p>
              <p className="mb-4 text-lg">
                What started as a small corner shop has grown into a beloved local institution, 
                but our core values remain the same: quality, community, and sustainability.
              </p>
              <p className="text-lg">
                Every cup we serve is crafted with care using ethically sourced beans and 
                traditional brewing methods that bring out unique flavor profiles.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/cafe-owner.jpg" 
                alt="Cafe Owner" 
                className="rounded-lg shadow-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-cafe-orange rounded-lg hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-cafe-beige/30">
        <div className="cafe-container">
          <h2 className="text-3xl font-bold text-cafe-espresso mb-8 text-center">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-cafe-brown rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Quality</h3>
              <p className="text-center text-muted-foreground">
                We source the finest beans and ingredients, and train our baristas to prepare each drink with precision and care.
              </p>
            </div>
            
            {/* Community */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-cafe-brown rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Community</h3>
              <p className="text-center text-muted-foreground">
                We believe in creating spaces where people can connect, collaborate, and build lasting relationships.
              </p>
            </div>
            
            {/* Sustainability */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-cafe-brown rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Sustainability</h3>
              <p className="text-center text-muted-foreground">
                We are committed to environmentally friendly practices, from our ethically sourced beans to our compostable packaging.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Visit Us Section */}
      <section className="py-16">
        <div className="cafe-container text-center">
          <h2 className="text-3xl font-bold text-cafe-espresso mb-6">
            Visit Us Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We'd love to serve you our delicious coffee and treats. Stop by our cafe and experience the Oasis difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-cafe-brown hover:bg-cafe-darkBrown">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-cafe-brown text-cafe-brown hover:bg-cafe-beige">
              <Link to="/menu">
                Browse Our Menu
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
