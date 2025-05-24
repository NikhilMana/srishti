
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Clock, 
  Layers, 
  Lock, 
  BarChart3, 
  CheckCircle2,
  Camera,
  Mic,
  FileText,
  Users,
  Shield,
  Zap
} from 'lucide-react';

const Features = () => {
  const coreFeatures = [
    {
      name: 'Real-time Translation',
      description: 'Advanced AI translates sign language to text immediately, enabling seamless communication during medical appointments.',
      icon: Clock,
      category: 'Core'
    },
    {
      name: 'Medical-Grade Accuracy',
      description: 'Built using medical terminology libraries with 95%+ accuracy for healthcare-specific signs and terminology.',
      icon: CheckCircle2,
      category: 'Core'
    },
    {
      name: 'HIPAA Compliance',
      description: 'End-to-end encryption and strict privacy protocols ensure all patient communication remains confidential.',
      icon: Lock,
      category: 'Security'
    },
    {
      name: 'Medical Dictionary',
      description: 'Specialized healthcare terminology library for translating complex medical terms accurately.',
      icon: Layers,
      category: 'Core'
    },
    {
      name: 'Communication History',
      description: 'Save important conversations for future reference, making follow-up appointments more effective.',
      icon: MessageSquare,
      category: 'Data'
    },
    {
      name: 'Analytics & Reports',
      description: 'Track communication effectiveness with detailed reports for healthcare providers.',
      icon: BarChart3,
      category: 'Analytics'
    }
  ];

  const advancedFeatures = [
    {
      name: 'Multi-Camera Support',
      description: 'Support for multiple camera angles to capture sign language from different perspectives.',
      icon: Camera,
      category: 'Hardware'
    },
    {
      name: 'Voice Integration',
      description: 'Seamlessly integrate with speech-to-text for comprehensive communication support.',
      icon: Mic,
      category: 'Integration'
    },
    {
      name: 'Digital Forms',
      description: 'Convert complex medical forms into accessible sign language interpretations.',
      icon: FileText,
      category: 'Accessibility'
    },
    {
      name: 'Multi-User Sessions',
      description: 'Support for group consultations with multiple participants and interpreters.',
      icon: Users,
      category: 'Collaboration'
    },
    {
      name: 'Data Protection',
      description: 'Advanced security measures including audit trails and access controls.',
      icon: Shield,
      category: 'Security'
    },
    {
      name: 'Fast Processing',
      description: 'Lightning-fast translation processing with minimal latency for real-time communication.',
      icon: Zap,
      category: 'Performance'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Core': 'bg-healthcare-100 text-healthcare-800',
      'Security': 'bg-red-100 text-red-800',
      'Data': 'bg-blue-100 text-blue-800',
      'Analytics': 'bg-purple-100 text-purple-800',
      'Hardware': 'bg-green-100 text-green-800',
      'Integration': 'bg-yellow-100 text-yellow-800',
      'Accessibility': 'bg-indigo-100 text-indigo-800',
      'Collaboration': 'bg-pink-100 text-pink-800',
      'Performance': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Features</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed to bridge communication gaps in healthcare settings for deaf and hard of hearing patients.
            </p>
          </div>

          {/* Core Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <feature.icon className="h-8 w-8 text-healthcare-600" />
                      <Badge className={getCategoryColor(feature.category)}>
                        {feature.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Advanced Features */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Advanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advancedFeatures.map((feature, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <feature.icon className="h-8 w-8 text-healthcare-600" />
                      <Badge className={getCategoryColor(feature.category)}>
                        {feature.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Feature Highlights */}
          <section className="mt-16 bg-healthcare-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SignaHealth?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform is specifically designed for healthcare environments with unique challenges and requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-healthcare-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Proven Accuracy</h3>
                <p className="text-gray-600">Over 95% accuracy rate in clinical environments</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-healthcare-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Secure & Compliant</h3>
                <p className="text-gray-600">HIPAA compliant with enterprise-grade security</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-healthcare-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Real-time Processing</h3>
                <p className="text-gray-600">Instant translation with minimal latency</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
