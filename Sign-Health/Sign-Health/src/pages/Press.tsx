
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, ExternalLink } from 'lucide-react';

const Press = () => {
  const pressReleases = [
    {
      date: "December 10, 2024",
      title: "SignaHealth Secures $15M Series A to Expand AI-Powered Healthcare Communication",
      summary: "Funding will accelerate product development and expand access to sign language translation in healthcare settings nationwide.",
      category: "Funding"
    },
    {
      date: "November 15, 2024",
      title: "SignaHealth Partners with Mayo Clinic to Improve Patient Communication",
      summary: "Strategic partnership brings AI-powered sign language translation to one of the nation's leading healthcare systems.",
      category: "Partnership"
    },
    {
      date: "October 20, 2024",
      title: "SignaHealth Wins Healthcare Innovation Award at MedTech Breakthrough 2024",
      summary: "Recognition for outstanding contribution to healthcare accessibility and patient care improvement.",
      category: "Award"
    },
    {
      date: "September 5, 2024",
      title: "New Study Shows 40% Improvement in Patient Satisfaction with SignaHealth",
      summary: "Independent research demonstrates significant impact on communication quality and patient outcomes.",
      category: "Research"
    }
  ];

  const mediaKit = [
    {
      title: "Company Logos",
      description: "High-resolution logos in various formats",
      size: "2.3 MB"
    },
    {
      title: "Product Screenshots",
      description: "Screenshots of SignaHealth in action",
      size: "5.1 MB"
    },
    {
      title: "Executive Photos",
      description: "Professional headshots of leadership team",
      size: "8.7 MB"
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics and company information",
      size: "245 KB"
    }
  ];

  const coverage = [
    {
      publication: "TechCrunch",
      title: "This AI startup is making healthcare more accessible for deaf patients",
      date: "November 2024"
    },
    {
      publication: "Modern Healthcare",
      title: "Sign language AI breaks communication barriers in hospitals",
      date: "October 2024"
    },
    {
      publication: "Forbes",
      title: "The Future of Inclusive Healthcare Technology",
      date: "September 2024"
    },
    {
      publication: "STAT News",
      title: "How AI is transforming patient-provider communication",
      date: "August 2024"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Press & Media</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Latest news, announcements, and media resources from SignaHealth.
            </p>
          </div>

          {/* Press Releases */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">{release.category}</Badge>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {release.date}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2">{release.title}</CardTitle>
                        <p className="text-gray-600 dark:text-gray-300">{release.summary}</p>
                      </div>
                      <Button variant="outline" className="border-healthcare-300 text-healthcare-600 hover:bg-healthcare-50 whitespace-nowrap">
                        Read More
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Media Coverage */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Media Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coverage.map((article, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="font-semibold text-healthcare-600 dark:text-healthcare-400 mb-2">
                      {article.publication}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{article.date}</span>
                      <Button variant="ghost" size="sm" className="text-healthcare-600 hover:text-healthcare-700">
                        Read Article
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Media Kit */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Media Kit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaKit.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <Download className="h-8 w-8 text-healthcare-600 dark:text-healthcare-400 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{item.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">{item.size}</div>
                    <Button variant="outline" size="sm" className="w-full border-healthcare-300 text-healthcare-600 hover:bg-healthcare-50">
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Media Contact</h2>
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Press Inquiries</h3>
                <div className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                  <p>
                    <strong>Contact:</strong> Sarah Mitchell, Communications Director
                  </p>
                  <p>
                    <strong>Email:</strong> press@signhealth.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
                <Button className="bg-healthcare-600 hover:bg-healthcare-700">
                  Send Media Inquiry
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

export default Press;
