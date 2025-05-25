
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Accessibility First",
      description: "We believe healthcare should be accessible to everyone, regardless of hearing ability."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Leveraging cutting-edge AI technology to break down communication barriers."
    },
    {
      icon: Users,
      title: "Community",
      description: "Working closely with the deaf and hard of hearing community to improve our solutions."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering the highest quality healthcare communication tools."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former healthcare administrator with 15 years of experience improving patient care accessibility."
    },
    {
      name: "Alex Chen",
      role: "CTO & Co-Founder",
      bio: "AI researcher specializing in computer vision and natural language processing technologies."
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Community Relations",
      bio: "Deaf community advocate and certified ASL interpreter with 10+ years in healthcare."
    },
    {
      name: "Dr. Michael Park",
      role: "Chief Medical Officer",
      bio: "Practicing physician and researcher focused on healthcare accessibility and patient outcomes."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-7xl mx-auto py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About SignaHealth</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to revolutionize healthcare communication by breaking down barriers 
              between healthcare providers and deaf or hard of hearing patients through innovative AI technology.
            </p>
          </div>

          {/* Story Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    SignaHealth was founded in 2022 when our team witnessed firsthand the communication 
                    challenges faced by deaf and hard of hearing patients in healthcare settings. Despite 
                    the availability of interpreters, many patients still struggled to receive timely and 
                    effective care due to communication barriers.
                  </p>
                  <p>
                    We realized that technology could bridge this gap, making healthcare more accessible 
                    and ensuring that every patient receives the care they deserve, regardless of their 
                    hearing ability.
                  </p>
                  <p>
                    Today, SignaHealth serves over 500 healthcare facilities across the country, helping 
                    thousands of patients communicate more effectively with their healthcare providers.
                  </p>
                </div>
              </div>
              <div className="bg-healthcare-50 dark:bg-healthcare-900/20 p-8 rounded-lg">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-healthcare-600 dark:text-healthcare-400">500+</div>
                    <div className="text-gray-600 dark:text-gray-300">Healthcare Facilities</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-healthcare-600 dark:text-healthcare-400">50K+</div>
                    <div className="text-gray-600 dark:text-gray-300">Patient Sessions</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-healthcare-600 dark:text-healthcare-400">95%</div>
                    <div className="text-gray-600 dark:text-gray-300">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-healthcare-600 dark:text-healthcare-400">24/7</div>
                    <div className="text-gray-600 dark:text-gray-300">Availability</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <value.icon className="h-12 w-12 text-healthcare-600 dark:text-healthcare-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-healthcare-100 dark:bg-healthcare-900/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-healthcare-600 dark:text-healthcare-400" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-healthcare-600 dark:text-healthcare-400 text-sm mb-3">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
