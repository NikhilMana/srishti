
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small clinics and individual practitioners",
      features: [
        "Up to 50 patient sessions per month",
        "Basic sign language translation",
        "Email support",
        "HIPAA compliant",
        "Basic analytics"
      ]
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Ideal for medium-sized healthcare facilities",
      features: [
        "Up to 200 patient sessions per month",
        "Advanced sign language translation",
        "Priority support",
        "HIPAA compliant",
        "Advanced analytics",
        "Custom branding",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large healthcare systems and hospitals",
      features: [
        "Unlimited patient sessions",
        "Premium sign language translation",
        "24/7 dedicated support",
        "HIPAA compliant",
        "Advanced analytics & reporting",
        "Custom branding",
        "Full API access",
        "On-premise deployment option",
        "Custom integrations"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your healthcare facility's needs. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-healthcare-500 shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-healthcare-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-healthcare-600">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-300">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-healthcare-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-healthcare-600 hover:bg-healthcare-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <Button variant="outline" className="border-healthcare-300 text-healthcare-600 hover:bg-healthcare-50">
              Have questions? Contact our sales team
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
