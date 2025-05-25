
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from 'lucide-react';

const testimonials = [
  {
    content: "SignHealth has transformed how I communicate with my doctor. For the first time, I feel fully understood during my appointments.",
    name: "Sarah Johnson",
    role: "Patient",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "As a physician, this tool has helped me provide better care to my deaf patients. The translation is accurate and doesn't interfere with our appointment flow.",
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    imageUrl: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    content: "Our hospital has seen a 40% improvement in patient satisfaction among deaf and hard of hearing patients since implementing SignHealth.",
    name: "Rebecca Torres",
    role: "Hospital Administrator",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const Testimonials = () => {
  return (
    <div id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-healthcare-600 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Hear from our users
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            SignHealth is making a real difference in healthcare communication.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex mb-4">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-lg text-gray-600 mb-4">{testimonial.content}</p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
