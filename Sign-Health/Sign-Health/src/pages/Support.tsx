
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, BookOpen, Video, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Support = () => {
  const faqs = [
    {
      question: "How accurate is the sign language translation?",
      answer: "Our AI-powered translation system achieves over 95% accuracy for common medical signs and terminology. We continuously improve our model with medical professional feedback and specialized healthcare sign language datasets."
    },
    {
      question: "Is SignaHealth HIPAA compliant?",
      answer: "Yes, SignaHealth is fully HIPAA compliant. All communications are encrypted end-to-end, and we follow strict privacy protocols to ensure patient confidentiality is maintained at all times."
    },
    {
      question: "What devices are supported?",
      answer: "SignaHealth works on desktop computers, tablets, and smartphones with camera capabilities. We recommend using Chrome, Firefox, or Safari browsers for the best experience."
    },
    {
      question: "How do I set up SignaHealth in my healthcare facility?",
      answer: "Contact our support team for a personalized setup consultation. We provide training for your staff and can integrate with your existing healthcare management systems."
    },
    {
      question: "Can I save translation sessions for medical records?",
      answer: "Yes, with patient consent, you can save important translation sessions to their medical records. This helps maintain continuity of care and improves follow-up appointments."
    },
    {
      question: "What if the system doesn't recognize a specific sign?",
      answer: "You can use our manual input feature to type clarifications, and our system learns from these corrections. We also have a growing database of regional sign variations."
    }
  ];

  const supportOptions = [
    {
      title: "Documentation",
      description: "Access our comprehensive guides and tutorials",
      icon: BookOpen,
      action: "View Docs"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for getting started",
      icon: Video,
      action: "Watch Videos"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      action: "Start Chat"
    },
    {
      title: "Download Resources",
      description: "Get setup guides and training materials",
      icon: Download,
      action: "Download"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to your questions and get the help you need to make the most of SignaHealth.
            </p>
          </div>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {supportOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <option.icon className="h-12 w-12 text-healthcare-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <Button variant="outline" className="border-healthcare-300 text-healthcare-600 hover:bg-healthcare-50">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Can't find what you're looking for? <Link to="/contact" className="text-healthcare-600 hover:underline">Contact our support team</Link>
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <HelpCircle className="h-6 w-6 text-healthcare-600" />
                  Need More Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Our support team is available to help you with any questions or issues you may have.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button className="bg-healthcare-600 hover:bg-healthcare-700">
                      Contact Support
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-healthcare-300 text-healthcare-600">
                    Schedule a Demo
                  </Button>
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

export default Support;
