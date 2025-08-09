"use client";
import React from 'react';
import { Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Testimonials = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLElement>();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation<HTMLDivElement>();

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
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`py-20 rounded-t-[3rem] transition-all duration-500 ease-out ${
        sectionVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Stories of Hope
          </h2>
          <p className="text-lg text-gray-700 max-w-5xl mx-auto">
            Real experiences from people who have found comfort and strength through our resources
          </p>
        </div>
        
        <div 
          ref={cardsRef}
          className={`grid md:grid-cols-3 gap-8 transition-all duration-500 ease-out delay-300 ${
            cardsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-16'
          }`}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Quote className="h-8 w-8 text-pink-400 mb-4" />
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-gray-700">
                  {testimonial.author}
                </p>
                <p className="text-gray-700 text-sm">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;