"use client";
import React from 'react';
import { Quote } from 'lucide-react';
import './hope.css';
import '../../src/app/globals.css';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "These cards have become my daily companions. They remind me that it's okay to not be okay, and that healing is a journey.",
      author: "Sarah M.",
      role: "College Student"
    },
    {
      quote: "As a therapist, I recommend these cards to many of my clients. They're beautifully designed and genuinely helpful.",
      author: "Dr. James Wilson",
      role: "Licensed Therapist"
    },
    {
      quote: "The breathing technique cards helped me through my most anxious moments. I keep them in my purse wherever I go.",
      author: "Maria L.",
      role: "Working Parent"
    },
    {
      quote: "The breathing technique cards helped me through my most anxious moments. I keep them in my purse wherever I go.",
      author: "Maria L.",
      role: "Working Parent"
    },
    {
      quote: "The breathing technique cards helped me through my most anxious moments. I keep them in my purse wherever I go.",
      author: "Maria L.",
      role: "Working Parent"
    },
  ];

  // Duplicate testimonials for a seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/30 px-4 py-2 rounded-full">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Stories of Hope
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real experiences from people who have found comfort and strength through our resources
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="animate-scroll p-1">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800/80 backdrop-blur-sm border-2 border-pink-200/50 dark:border-pink-700/50 p-8 rounded-2xl shadow-md hover:shadow-2xl dark:hover:shadow-pink-500/10 transition-all duration-300 hover:-translate-y-1 mx-4 flex-shrink-0"
                style={{ width: '350px' }}
              >
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="h-6 w-6 text-pink-500 dark:text-pink-400" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed text-sm">
                  "{testimonial.quote}"
                </p>
                <div className="border-t-2 border-pink-200/30 dark:border-pink-700/30 pt-4">
                  <p className="font-bold text-gray-800 dark:text-gray-100">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;