
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, Calendar, Award, ExternalLink } from 'lucide-react';

const Community = () => {
  const forums = [
    {
      title: "General Discussion",
      description: "Share experiences, ask questions, and connect with other SignaHealth users",
      members: 1205,
      posts: 3420,
      category: "General"
    },
    {
      title: "Healthcare Professionals",
      description: "A space for doctors, nurses, and healthcare staff to discuss best practices",
      members: 856,
      posts: 2190,
      category: "Professional"
    },
    {
      title: "Technical Support",
      description: "Get help with technical issues and troubleshooting",
      members: 642,
      posts: 1870,
      category: "Support"
    },
    {
      title: "Feature Requests",
      description: "Suggest new features and vote on community proposals",
      members: 924,
      posts: 1650,
      category: "Feedback"
    }
  ];

  const events = [
    {
      title: "Monthly Community Call",
      date: "January 15, 2025",
      time: "2:00 PM EST",
      type: "Virtual",
      description: "Join our monthly community call to hear product updates and share feedback"
    },
    {
      title: "Healthcare Accessibility Summit",
      date: "February 20-21, 2025",
      time: "All Day",
      type: "Hybrid",
      description: "Two-day summit focused on improving healthcare accessibility and inclusion"
    },
    {
      title: "Technical Workshop: API Integration",
      date: "March 5, 2025",
      time: "1:00 PM EST",
      type: "Virtual",
      description: "Learn how to integrate SignaHealth API into your existing systems"
    }
  ];

  const ambassadors = [
    {
      name: "Dr. Jennifer Martinez",
      role: "Emergency Medicine Physician",
      location: "Phoenix, AZ",
      description: "Championing accessible emergency care for deaf patients",
      contributions: "15 training sessions, 200+ professionals trained"
    },
    {
      name: "David Chen",
      role: "Hospital IT Director",
      location: "Seattle, WA",
      description: "Leading technical implementation across healthcare networks",
      contributions: "5 hospitals onboarded, technical documentation"
    },
    {
      name: "Lisa Thompson",
      role: "ASL Interpreter",
      location: "Chicago, IL",
      description: "Ensuring cultural accuracy and improving sign recognition",
      contributions: "500+ signs validated, cultural sensitivity training"
    }
  ];

  const resources = [
    {
      title: "User Guide Library",
      description: "Comprehensive guides created by community members",
      link: "/documentation"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step tutorials for common use cases",
      link: "#"
    },
    {
      title: "Best Practices Hub",
      description: "Proven strategies for successful implementation",
      link: "#"
    },
    {
      title: "Research & Studies",
      description: "Academic research and case studies from the community",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">SignaHealth Community</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Connect with healthcare professionals, share experiences, and help us build a more accessible future together.
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-healthcare-600 dark:text-healthcare-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-healthcare-600 dark:text-healthcare-400">5,200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Community Members</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <MessageCircle className="h-8 w-8 text-healthcare-600 dark:text-healthcare-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-healthcare-600 dark:text-healthcare-400">12,500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Forum Posts</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-healthcare-600 dark:text-healthcare-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-healthcare-600 dark:text-healthcare-400">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Monthly Events</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-8 w-8 text-healthcare-600 dark:text-healthcare-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-healthcare-600 dark:text-healthcare-400">200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Hospitals Served</div>
              </CardContent>
            </Card>
          </div>

          {/* Discussion Forums */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Discussion Forums</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {forums.map((forum, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{forum.title}</CardTitle>
                        <Badge variant="outline">{forum.category}</Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{forum.description}</p>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{forum.members} members</span>
                      <span>{forum.posts} posts</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button className="bg-healthcare-600 hover:bg-healthcare-700">
                Join the Discussion
              </Button>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Upcoming Events</h2>
            <div className="space-y-6">
              {events.map((event, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <Badge variant={event.type === 'Virtual' ? 'secondary' : 'default'}>
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {event.date}
                          </div>
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <Button variant="outline" className="border-healthcare-300 text-healthcare-600 hover:bg-healthcare-50">
                        Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Ambassadors */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Community Ambassadors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ambassadors.map((ambassador, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-healthcare-100 dark:bg-healthcare-900/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-healthcare-600 dark:text-healthcare-400" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{ambassador.name}</h3>
                    <p className="text-healthcare-600 dark:text-healthcare-400 text-sm mb-1">{ambassador.role}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">{ambassador.location}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{ambassador.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <strong>Contributions:</strong> {ambassador.contributions}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Resources */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Community Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-3">{resource.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{resource.description}</p>
                    <Button variant="outline" size="sm" className="border-healthcare-300 text-healthcare-600 hover:bg-healthcare-50">
                      Explore
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Join CTA */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Ready to Join Our Community?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Connect with thousands of healthcare professionals working together to improve accessibility and patient care.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-healthcare-600 hover:bg-healthcare-700">
                    Create Account
                  </Button>
                  <Button variant="outline" className="border-healthcare-300 text-healthcare-600">
                    Learn More
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

export default Community;
