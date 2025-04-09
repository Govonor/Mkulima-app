import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/ProductGrid';
import { Tractor, ShoppingBasket, Leaf } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-green-600 to-orange-400 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-extrabold leading-tight mb-4 tracking-tight">
            Welcome to Ask Mkulima
          </h1>
          <p className="text-xl max-w-xl mx-auto mb-6">
            Connecting farmers and businesses across Kenya with fresh produce and smart tools.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              className="bg-white text-green-600 hover:bg-green-100"
              onClick={() => navigate('/products')}
            >
              Browse Products
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/signup')}
            >
              Join as Farmer
            </Button>
          </div>
        </div>
      </header>

      {/* Product Preview */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-800">Fresh Picks for You</h2>
          <ProductGrid filter="featured" />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 text-green-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow hover:shadow-md">
              <Tractor className="mx-auto mb-4 text-green-700" size={40} />
              <h3 className="text-xl font-semibold mb-2">Farmers Upload</h3>
              <p>List fresh produce directly from your farm.</p>
            </div>
            <div className="p-6 border rounded-lg shadow hover:shadow-md">
              <ShoppingBasket className="mx-auto mb-4 text-orange-600" size={40} />
              <h3 className="text-xl font-semibold mb-2">Buyers Order</h3>
              <p>Businesses find what they need at great prices.</p>
            </div>
            <div className="p-6 border rounded-lg shadow hover:shadow-md">
              <Leaf className="mx-auto mb-4 text-green-500" size={40} />
              <h3 className="text-xl font-semibold mb-2">Delivered Fresh</h3>
              <p>Choose your preferred delivery service and track live.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 text-green-800">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <blockquote className="p-6 border-l-4 border-green-600 bg-white shadow rounded">
              <p className="italic mb-2">"I sell my vegetables easily with Ask Mkulima and get paid via M-Pesa!"</p>
              <footer className="text-sm text-green-700">– Achieng, Farmer from Kisumu</footer>
            </blockquote>
            <blockquote className="p-6 border-l-4 border-orange-500 bg-white shadow rounded">
              <p className="italic mb-2">"We save money and get farm-fresh produce weekly for our hotel."</p>
              <footer className="text-sm text-orange-600">– Brian, Hotel Manager in Nairobi</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 py-16 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Start Your Journey Today</h2>
        <p className="mb-8 text-lg max-w-xl mx-auto">
          Whether you’re a farmer or a buyer, we’ve got the tools you need to succeed.
        </p>
        <Button
          className="bg-white text-orange-500 hover:bg-orange-100"
          onClick={() => navigate('/signup')}
        >
          Join Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ask Mkulima</h3>
          <p className="text-sm text-gray-300">Empowering farmers. Enabling businesses. Feeding the nation.</p>
          <p className="mt-4 text-gray-500 text-xs">© {new Date().getFullYear()} Ask Mkulima. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
