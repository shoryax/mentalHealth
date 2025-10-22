"use client";
import React from 'react';
import { Smile, Sun, Leaf, Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FeaturedCards = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLElement>();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation<HTMLDivElement>();
  const cards = [
    {
      icon: <Smile className="h-8 w-8 text-yellow-500" />, 
      title: "Daily Affirmations",
      description: "Start your day with positive thoughts and self-compassion",
      gradient: "from-yellow-400/20 via-orange-400/20 to-yellow-400/20",
      iconBg: "bg-yellow-100",
      borderColor: "border-yellow-200/50"
    },
    {
      icon: <Sun className="h-8 w-8 text-orange-500" />, 
      title: "Mindfulness Moments",
      description: "Quick exercises to center yourself and find peace",
      gradient: "from-orange-400/20 via-red-400/20 to-orange-400/20",
      iconBg: "bg-orange-100",
      borderColor: "border-orange-200/50"
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-500" />, 
      title: "Breathing Techniques",
      description: "Simple breathing exercises to reduce stress and anxiety",
      gradient: "from-green-400/20 via-teal-400/20 to-green-400/20",
      iconBg: "bg-green-100",
      borderColor: "border-green-200/50"
    },
    {
      icon: <Star className="h-8 w-8 text-purple-500" />, 
      title: "Gratitude Practice",
      description: "Cultivate appreciation and positive perspective",
      gradient: "from-purple-400/20 via-pink-400/20 to-purple-400/20",
      iconBg: "bg-purple-100",
      borderColor: "border-purple-200/50"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className={`py-20 transition-all duration-500 ease-out ${
        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-pink-600 bg-pink-100 px-4 py-2 rounded-full">
              FEATURED RESOURCES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Mental Health Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover practical resources designed to support your wellness journey
          </p>
        </div>
        
        <div
          ref={cardsRef}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500 ease-out delay-300 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group relative  bg-white border-2 ${card.borderColor} rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`${card.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCards;