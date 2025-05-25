
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">SignHealth</h3>
            <p className="text-gray-400 mb-4">Breaking barriers in healthcare communication for deaf and hard of hearing patients.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-healthcare-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-healthcare-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-healthcare-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-400 hover:text-healthcare-500">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-healthcare-500">Pricing</Link></li>
              <li><Link to="/updates" className="text-gray-400 hover:text-healthcare-500">Updates</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-healthcare-500">Beta Program</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-healthcare-500">About</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-healthcare-500">Careers</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-healthcare-500">Press</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-healthcare-500">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-healthcare-500">Blog</Link></li>
              <li><Link to="/documentation" className="text-gray-400 hover:text-healthcare-500">Documentation</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-healthcare-500">Community</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-healthcare-500">Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} SignHealth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
