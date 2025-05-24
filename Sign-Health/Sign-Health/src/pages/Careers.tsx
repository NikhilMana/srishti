
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Briefcase } from 'lucide-react';

const Careers = () => {
  const positions = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Lead the development of our AI-powered sign language translation engine.",
      requirements: [
        "5+ years of experience in machine learning",
        "Experience with computer vision and NLP",
        "Proficiency in Python and TensorFlow/PyTorch",
        "Experience with healthcare applications preferred"
      ]
    },
    {
      title: "Healthcare Partnership Manager",
      department: "Business Development",
      location: "Remote",
      type: "Full-time",
      description: "Build relationships with healthcare facilities and expand our market presence.",
      requirements: [
        "3+ years in healthcare business development",
        "Strong relationship building skills",
        "Experience with B2B sales",
        "Understanding of healthcare regulations"
      ]
    },
    {
      title: "ASL Interpreter & Content Specialist",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description: "Help improve our sign language database and ensure cultural accuracy.",
      requirements: [
        "Certified ASL interpreter",
        "Experience in healthcare interpreting",
        "Understanding of deaf culture",
        "Technical writing skills"
      ]
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Design intuitive interfaces for healthcare professionals and patients.",
      requirements: [
        "3+ years of UX/UI design experience",
        "Experience with accessibility design",
        "Proficiency in Figma and design systems",
        "Healthcare experience preferred"
      ]
    }
  ];

  const benefits = [
    "Competitive salary and equity package",
    "Comprehensive health, dental, and vision insurance",
    "Flexible work arrangements and remote options",
    "Professional development budget",
    "Unlimited PTO policy",
    "401(k) with company matching",
    "Mental health and wellness programs",
    "Opportunity to make a meaningful impact"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Join Our Mission</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Help us revolutionize healthcare communication and make a difference in patients' lives.
            </p>
          </div>

          {/* Culture Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why Work With Us?</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    At SignaHealth, we're not just building technology – we're breaking down barriers 
                    and creating a more inclusive healthcare system. Our team is passionate about 
                    accessibility and driven by the impact we make every day.
                  </p>
                  <p>
                    We foster a collaborative environment where diverse perspectives are valued, 
                    innovation is encouraged, and every team member has the opportunity to grow 
                    professionally while making a meaningful difference.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Users className="h-8 w-8 text-healthcare-600 dark:text-healthcare-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-healthcare-600 dark:text-healthcare-400">50+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Team Members</div>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Briefcase className="h-8 w-8 text-healthcare-600 dark:text-healthcare-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-healthcare-600 dark:text-healthcare-400">95%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Employee Satisfaction</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Open Positions</h2>
            <div className="space-y-6">
              {positions.map((position, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">{position.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{position.department}</Badge>
                          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {position.type}
                          </div>
                        </div>
                      </div>
                      <Button className="bg-healthcare-600 hover:bg-healthcare-700 whitespace-nowrap">
                        Apply Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{position.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start">
                            <span className="h-2 w-2 bg-healthcare-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-700 dark:text-gray-300">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Benefits & Perks</h2>
            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <span className="h-2 w-2 bg-healthcare-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Don't See Your Dream Role?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We're always looking for talented individuals who share our mission. 
                  Send us your resume and let us know how you'd like to contribute.
                </p>
                <Button variant="outline" className="border-healthcare-300 text-healthcare-600 hover:bg-healthcare-50">
                  Send General Application
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
