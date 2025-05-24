
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: "The Future of Healthcare Communication: Breaking Down Language Barriers",
      excerpt: "Exploring how AI-powered sign language translation is revolutionizing patient care and creating more inclusive healthcare environments.",
      author: "Dr. Sarah Johnson",
      date: "December 18, 2024",
      category: "Healthcare Innovation",
      readTime: "5 min read",
      featured: true
    },
    {
      title: "Understanding Deaf Culture in Healthcare Settings",
      excerpt: "A comprehensive guide for healthcare professionals on providing culturally competent care for deaf and hard of hearing patients.",
      author: "Maria Rodriguez",
      date: "December 15, 2024",
      category: "Accessibility",
      readTime: "7 min read"
    },
    {
      title: "AI Ethics in Healthcare: Ensuring Inclusive Technology",
      excerpt: "Discussing the importance of ethical AI development and how we ensure our technology serves all communities equitably.",
      author: "Alex Chen",
      date: "December 10, 2024",
      category: "Technology",
      readTime: "6 min read"
    },
    {
      title: "Case Study: Improving Emergency Room Communication",
      excerpt: "How one hospital reduced communication barriers and improved patient satisfaction scores by 40% using SignaHealth.",
      author: "Dr. Michael Park",
      date: "December 5, 2024",
      category: "Case Study",
      readTime: "8 min read"
    },
    {
      title: "The Technology Behind Real-Time Sign Language Translation",
      excerpt: "A deep dive into the computer vision and machine learning technologies that power our translation engine.",
      author: "Alex Chen",
      date: "November 28, 2024",
      category: "Technology",
      readTime: "10 min read"
    },
    {
      title: "Patient Stories: The Impact of Better Communication",
      excerpt: "Real stories from patients and families about how improved communication has enhanced their healthcare experience.",
      author: "Maria Rodriguez",
      date: "November 20, 2024",
      category: "Patient Stories",
      readTime: "4 min read"
    }
  ];

  const categories = ["All", "Healthcare Innovation", "Technology", "Accessibility", "Case Study", "Patient Stories"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20 px-4">
        <div className="max-w-7xl mx-auto py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">SignaHealth Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Insights, stories, and updates from the world of healthcare communication and accessibility.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={category === "All" ? "bg-healthcare-600 hover:bg-healthcare-700" : "border-healthcare-300 text-healthcare-600 hover:bg-healthcare-50"}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Post */}
          {blogPosts.filter(post => post.featured).map((post, index) => (
            <Card key={index} className="mb-12 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full bg-healthcare-100 dark:bg-healthcare-900/20 flex items-center justify-center">
                    <span className="text-healthcare-600 dark:text-healthcare-400 text-sm">Featured Image</span>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-healthcare-600 text-white">Featured</Badge>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{post.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <Button className="bg-healthcare-600 hover:bg-healthcare-700">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardHeader>
                </div>
              </div>
            </Card>
          ))}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-healthcare-100 dark:bg-healthcare-900/20 flex items-center justify-center">
                  <span className="text-healthcare-600 dark:text-healthcare-400 text-sm">Article Image</span>
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">{post.category}</Badge>
                  <h3 className="font-bold text-lg mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{post.readTime}</span>
                    <Button variant="ghost" size="sm" className="text-healthcare-600 hover:text-healthcare-700 p-0">
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Subscribe to our newsletter to get the latest insights on healthcare accessibility and technology.
                </p>
                <div className="flex max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-healthcare-500 dark:bg-gray-800 dark:text-white"
                  />
                  <Button className="px-6 py-2 bg-healthcare-600 text-white rounded-r-md hover:bg-healthcare-700 rounded-l-none">
                    Subscribe
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

export default Blog;
