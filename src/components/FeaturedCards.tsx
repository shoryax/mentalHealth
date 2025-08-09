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
      color: "from-yellow-100 to-orange-100"
    },
    {
      icon: <Sun className="h-8 w-8 text-orange-500" />, 
      title: "Mindfulness Moments",
      description: "Quick exercises to center yourself and find peace",
      color: "from-orange-100 to-red-100"
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-500" />, 
      title: "Breathing Techniques",
      description: "Simple breathing exercises to reduce stress and anxiety",
      color: "from-green-100 to-teal-100"
    },
    {
      icon: <Star className="h-8 w-8 text-purple-500" />, 
      title: "Gratitude Practice",
      description: "Cultivate appreciation and positive perspective",
      color: "from-purple-100 to-pink-100"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className={`bg py-12 transition-all duration-500 ease-out ${
        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Featured Mental Health Cards
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Each card is designed to provide you with practical tools and gentle reminders for your mental wellness
          </p>
        </div>
        
        <div
          ref={cardsRef}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500 ease-out delay-300 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${card.color} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
            >
              <div className="mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-700">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCards;