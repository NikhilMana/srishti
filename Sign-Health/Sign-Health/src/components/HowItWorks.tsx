
import React from 'react';
import { 
  Camera, 
  Tv, 
  Repeat, 
  CheckCircle 
} from 'lucide-react';

const steps = [
  {
    id: '01',
    name: 'Capture Signs',
    description: 'Our app uses your device\'s camera to capture and analyze sign language gestures in real-time.',
    icon: Camera,
  },
  {
    id: '02',
    name: 'Instant Translation',
    description: 'Advanced AI translates sign language to text instantly, displaying it on screen for healthcare providers.',
    icon: Tv,
  },
  {
    id: '03',
    name: 'Two-way Communication',
    description: 'Providers can type responses that can be translated back to sign language using visual guides.',
    icon: Repeat,
  },
  {
    id: '04',
    name: 'Better Healthcare Outcomes',
    description: 'Improved communication leads to more accurate diagnoses and better treatment plans.',
    icon: CheckCircle,
  },
];

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-24 bg-healthcare-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-healthcare-600 font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple, powerful, and effective
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our technology works seamlessly in any healthcare environment
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.name} className="relative">
                <div className="absolute flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-healthcare-500 to-accent2-500 text-white">
                  <step.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <div className="ml-20 lg:ml-24">
                  <div className="text-lg leading-6 font-medium text-gray-900">
                    <span className="text-healthcare-600 font-bold">{step.id}</span> {step.name}
                  </div>
                  <p className="mt-2 text-base text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="lg:mx-auto lg:max-w-3xl lg:flex lg:items-center lg:justify-between">
            <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-healthcare-600 hover:bg-healthcare-700"
                >
                  Get Started
                </a>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-healthcare-600 bg-white hover:bg-gray-50"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
