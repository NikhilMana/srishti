
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Zap, Bug, Plus } from 'lucide-react';

const Updates = () => {
  const updates = [
    {
      version: "v2.1.0",
      date: "December 15, 2024",
      type: "feature",
      title: "Enhanced Sign Recognition",
      description: "Improved accuracy for medical terminology with 15% better recognition rates for specialized healthcare signs.",
      items: [
        "Added 200+ new medical signs to our database",
        "Improved facial expression recognition",
        "Better handling of regional sign variations"
      ]
    },
    {
      version: "v2.0.5",
      date: "December 1, 2024",
      type: "improvement",
      title: "Performance Optimizations",
      description: "Faster loading times and improved real-time translation performance.",
      items: [
        "30% faster real-time translation",
        "Reduced memory usage by 25%",
        "Improved mobile device compatibility"
      ]
    },
    {
      version: "v2.0.4",
      date: "November 20, 2024",
      type: "bugfix",
      title: "Bug Fixes & Stability",
      description: "Critical bug fixes and stability improvements based on user feedback.",
      items: [
        "Fixed translation delay issues",
        "Resolved camera permission problems on iOS",
        "Fixed session recording functionality"
      ]
    },
    {
      version: "v2.0.0",
      date: "November 1, 2024",
      type: "feature",
      title: "Major Release - Dark Mode & Analytics",
      description: "Introducing dark mode support and comprehensive analytics dashboard.",
      items: [
        "Dark mode theme support",
        "Advanced analytics dashboard",
        "Session recording and playback",
        "Improved user interface design",
        "Enhanced accessibility features"
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Plus className="h-4 w-4" />;
      case 'improvement':
        return <Zap className="h-4 w-4" />;
      case 'bugfix':
        return <Bug className="h-4 w-4" />;
      default:
        return <Plus className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      feature: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      improvement: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      bugfix: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    };
    
    return (
      <Badge className={variants[type as keyof typeof variants] || variants.feature}>
        {getTypeIcon(type)}
        <span className="ml-1 capitalize">{type === 'bugfix' ? 'Bug Fix' : type}</span>
      </Badge>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-4xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Product Updates</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay up to date with the latest features, improvements, and bug fixes in SignaHealth.
            </p>
          </div>

          <div className="space-y-8">
            {updates.map((update, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="font-mono">
                        {update.version}
                      </Badge>
                      {getTypeBadge(update.type)}
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {update.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{update.title}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">{update.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {update.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="h-2 w-2 bg-healthcare-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Want to be notified about new updates and features? Subscribe to our newsletter.
                </p>
                <div className="flex max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-healthcare-500"
                  />
                  <button className="px-6 py-2 bg-healthcare-600 text-white rounded-r-md hover:bg-healthcare-700">
                    Subscribe
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Updates;
