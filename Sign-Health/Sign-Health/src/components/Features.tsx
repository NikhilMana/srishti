
import React from 'react';
import { 
  MessageSquare, 
  Clock, 
  Layers, 
  Lock, 
  BarChart3, 
  CheckCircle2 
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    name: 'Real-time Translation',
    description: 'Our advanced AI translates sign language to text immediately, enabling seamless communication during medical appointments.',
    icon: Clock,
  },
  {
    name: 'Accurate & Reliable',
    description: 'Built using medical terminology libraries, our system understands healthcare-specific signs with high accuracy.',
    icon: CheckCircle2,
  },
  {
    name: 'Secure & Private',
    description: 'HIPAA compliant with end-to-end encryption to ensure all patient communication remains completely confidential.',
    icon: Lock,
  },
  {
    name: 'Medical Dictionary',
    description: 'Specialized healthcare terminology library for translating complex medical terms accurately between sign and text.',
    icon: Layers,
  },
  {
    name: 'Communication History',
    description: 'Save important conversations for future reference, making follow-up appointments more effective.',
    icon: MessageSquare,
  },
  {
    name: 'Progress Analytics',
    description: 'Track communication effectiveness over time with detailed reports for healthcare providers.',
    icon: BarChart3,
  },
];

const Features = () => {
  return (
    <div id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-healthcare-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Bridging the communication gap in healthcare
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our technology makes healthcare more accessible for deaf and hard of hearing patients.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-healthcare-100 text-healthcare-600 mb-5 group-hover:bg-healthcare-600 group-hover:text-white transition-all duration-300">
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
