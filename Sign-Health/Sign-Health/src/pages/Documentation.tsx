
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Book, Code, Zap, Shield, Settings } from 'lucide-react';

const Documentation = () => {
  const quickStart = [
    {
      step: "1",
      title: "Account Setup",
      description: "Create your SignaHealth account and complete the initial setup process."
    },
    {
      step: "2",
      title: "Hardware Requirements",
      description: "Ensure your device meets the minimum requirements for optimal performance."
    },
    {
      step: "3",
      title: "Staff Training",
      description: "Complete our online training modules to get your team up to speed."
    },
    {
      step: "4",
      title: "Go Live",
      description: "Start using SignaHealth with your patients and begin improving communication."
    }
  ];

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/translate",
      description: "Submit video data for real-time sign language translation"
    },
    {
      method: "GET",
      endpoint: "/api/v1/sessions",
      description: "Retrieve translation session history and analytics"
    },
    {
      method: "POST",
      endpoint: "/api/v1/sessions",
      description: "Create a new translation session"
    },
    {
      method: "DELETE",
      endpoint: "/api/v1/sessions/{id}",
      description: "Delete a specific translation session"
    }
  ];

  const troubleshooting = [
    {
      issue: "Translation accuracy is low",
      solution: "Ensure proper lighting and camera positioning. Check if signs are within our supported vocabulary."
    },
    {
      issue: "Video feed is choppy",
      solution: "Check internet connection speed. Minimum 10 Mbps upload speed recommended."
    },
    {
      issue: "Audio synchronization issues",
      solution: "Restart the application and ensure browser permissions are properly set."
    },
    {
      issue: "Can't access certain features",
      solution: "Verify your subscription plan includes the requested features. Contact support if issues persist."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Documentation</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to get started with SignaHealth and make the most of our platform.
            </p>
          </div>

          <Tabs defaultValue="getting-started" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="getting-started" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Getting Started
              </TabsTrigger>
              <TabsTrigger value="user-guide" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                User Guide
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                API Reference
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="troubleshooting" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Troubleshooting
              </TabsTrigger>
            </TabsList>

            <TabsContent value="getting-started" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Start Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickStart.map((item, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-healthcare-100 dark:bg-healthcare-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-healthcare-600 dark:text-healthcare-400 font-bold">{item.step}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Minimum Requirements</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>• HD webcam (720p minimum)</li>
                        <li>• 8 GB RAM</li>
                        <li>• 10 Mbps internet connection</li>
                        <li>• Chrome 90+, Firefox 88+, or Safari 14+</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Recommended</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>• 4K webcam for best accuracy</li>
                        <li>• 16 GB RAM</li>
                        <li>• 25 Mbps internet connection</li>
                        <li>• Latest browser versions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="user-guide" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Using SignaHealth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Starting a Translation Session</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                        <li>Log into your SignaHealth dashboard</li>
                        <li>Click "Start New Session" and select your patient</li>
                        <li>Position the camera to capture the signing area clearly</li>
                        <li>Begin the conversation - translations appear in real-time</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Best Practices</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>• Ensure good lighting on the signer</li>
                        <li>• Keep hands and arms visible in the camera frame</li>
                        <li>• Speak clearly when using voice-to-text features</li>
                        <li>• Use the feedback system to improve accuracy</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Reference</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      Our REST API allows you to integrate SignaHealth functionality into your existing systems.
                    </p>
                    <div className="space-y-3">
                      {apiEndpoints.map((endpoint, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {endpoint.endpoint}
                            </code>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{endpoint.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security & Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">HIPAA Compliance</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        SignaHealth is fully HIPAA compliant, ensuring that all patient health information is protected.
                      </p>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>• End-to-end encryption for all communications</li>
                        <li>• Secure data storage with AES-256 encryption</li>
                        <li>• Regular security audits and penetration testing</li>
                        <li>• Business Associate Agreements (BAA) available</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Data Handling</h4>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>• Video data is processed in real-time and not stored</li>
                        <li>• Session metadata can be optionally saved for analytics</li>
                        <li>• Patient data is segregated and access-controlled</li>
                        <li>• Automatic data purging based on retention policies</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="troubleshooting" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Common Issues & Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {troubleshooting.map((item, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 text-healthcare-600 dark:text-healthcare-400">
                          {item.issue}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">{item.solution}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-healthcare-50 dark:bg-healthcare-900/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Still Need Help?</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      If you can't find the solution to your problem, our support team is here to help.
                    </p>
                    <p className="text-sm">
                      <strong>Email:</strong> support@signhealth.com<br />
                      <strong>Phone:</strong> +1 (555) 123-4567<br />
                      <strong>Hours:</strong> Monday-Friday, 9 AM - 6 PM EST
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
