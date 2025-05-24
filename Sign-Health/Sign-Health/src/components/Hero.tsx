
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-white to-healthcare-50 dark:from-gray-900 dark:to-gray-800 pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center">
            <div className="animate-fade-in">
              <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:mt-5 sm:text-5xl lg:mt-6 xl:text-6xl">
                <span className="block">Breaking barriers in</span>
                <span className="block text-healthcare-600 dark:text-healthcare-400">healthcare communication</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg">
                SignHealth translates sign language to text in real-time, helping deaf and hard of hearing patients communicate effectively with healthcare providers. Better communication leads to better care.
              </p>
              <div className="mt-8 sm:mt-10 flex">
                <Button className="px-6 py-6 bg-healthcare-600 hover:bg-healthcare-700 text-white rounded-lg text-lg font-medium">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="ml-4 px-6 py-6 border-healthcare-200 dark:border-healthcare-700 text-healthcare-700 dark:text-healthcare-400 hover:bg-healthcare-50 dark:hover:bg-healthcare-900/20 rounded-lg text-lg font-medium">
                  Book a Demo
                </Button>
              </div>
              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                No credit card required. Free for healthcare providers.
              </div>
            </div>
          </div>
          <div className="mt-12 relative lg:mt-0 lg:col-span-6 xl:col-span-7">
            <div className="animate-fade-in-right">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white dark:bg-gray-800 sm:rounded-xl overflow-hidden">
                  <img 
                    className="w-full" 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                    alt="Doctor using SignHealth app with patient" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          "The app translated my signs accurately during my appointment."
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          - Sarah J., SignHealth User
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional photo below */}
              <div className="mt-8 animate-fade-in">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <div className="relative block w-full bg-white dark:bg-gray-800 sm:rounded-xl overflow-hidden">
                    <img 
                      className="w-full" 
                      src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                      alt="Healthcare technology in use" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-6">
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 inline-block">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            "Technology that truly makes a difference in patient care."
                          </p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            - Dr. Michael R., Healthcare Provider
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-0 -translate-y-1/2 -z-10 transform opacity-20">
        <svg width="404" height="784" fill="none" viewBox="0 0 404 784">
          <defs>
            <pattern id="pattern-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" fill="#0ea5e9" />
            </pattern>
          </defs>
          <rect width="404" height="784" fill="url(#pattern-squares)" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
