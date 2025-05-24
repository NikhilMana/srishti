
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <div id="contact" className="bg-healthcare-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Ready to improve healthcare communication?
        </h2>
        <p className="mt-4 text-lg leading-6 max-w-2xl mx-auto">
          Sign up today and start breaking down communication barriers in healthcare settings. Our platform is designed for hospitals, clinics, and individual practitioners.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/auth">
            <Button className="px-8 py-6 text-lg bg-white text-healthcare-700 hover:bg-gray-100">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
