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
      icon: <Brain className="h-10 w-10 text-blue-600" />,
      title: "Anxiety & Stress",
      description: "Tools and techniques to manage overwhelming feelings",
      cardCount: "24 Cards",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100/50",
      borderColor: "border-blue-200/50"
    },
    {
      icon: <Users className="h-10 w-10 text-green-600" />,
      title: "Relationships",
      description: "Building healthy connections and communication skills",
      cardCount: "18 Cards",
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100/50",
      borderColor: "border-green-200/50"
    },
    {
      icon: <Shield className="h-10 w-10 text-purple-600" />,
      title: "Self-Care",
      description: "Nurturing practices for your mind, body, and soul",
      cardCount: "32 Cards",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100/50",
      borderColor: "border-purple-200/50"
    },
    {
      icon: <Zap className="h-10 w-10 text-orange-600" />,
      title: "Motivation",
      description: "Inspiration to keep moving forward on difficult days",
      cardCount: "21 Cards",
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100/50",
      borderColor: "border-orange-200/50"
    }
  ];

  return (
    <div
      ref={sectionRef}
      className={`py-20 transition-all duration-500 ease-out ${
        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TwinklingStars />
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-pink-600 bg-pink-100 px-4 py-2 rounded-full">
              BROWSE CATEGORIES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent p-2">
            Explore by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the support you need with our organized collection of mental health resources
          </p>
        </div>

        <div
          ref={cardsRef}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500 ease-out delay-300 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group relative bg-white border-2 ${category.borderColor} rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10 text-center">
                <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className={`inline-block bg-gradient-to-r ${category.gradient} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
                  {category.cardCount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;