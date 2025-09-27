"use client";
import React from 'react';
import TwinklingStars from '@/app/settings/twinkle';
import { Brain, Users, Shield, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
const Categories = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation<HTMLDivElement>();

  const categories = [
    {
      icon: <Brain className="h-12 w-12 text-blue-600" />,
      title: "Anxiety & Stress",
      description: "Tools and techniques to manage overwhelming feelings",
      cardCount: "24 Cards"
    },
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      title: "Relationships",
      description: "Building healthy connections and communication skills",
      cardCount: "18 Cards"
    },
    {
      icon: <Shield className="h-12 w-12 text-purple-600" />,
      title: "Self-Care",
      description: "Nurturing practices for your mind, body, and soul",
      cardCount: "32 Cards"
    },
    {
      icon: <Zap className="h-12 w-12 text-orange-600" />,
      title: "Motivation",
      description: "Inspiration to keep moving forward on difficult days",
      cardCount: "21 Cards"
    }
  ];

  return (
    <div
      ref={sectionRef}
      className={`bg py-12 transition-all duration-500 ease-out ${
        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TwinklingStars />
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the support you need with our organized collection of mental health resources
          </p>
        </div>

        <div
          ref={cardsRef}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500 ease-out delay-300 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white/70 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group hover:scale-105"
            >
              <div className="mb-6 flex justify-center">
                <div className="p-3 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
                  {category.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                {category.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
              <span className="text-sm font-medium text-gray-600">
                {category.cardCount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;