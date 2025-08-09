"use client";
import React, { useEffect, useState } from 'react';

// Utility function for parallax offset
function getParallaxOffset(multiplier: number, mousePosition: { x: number; y: number }) {
  return {
    x: (mousePosition.x - window.innerWidth / 2) / 40 * multiplier,
    y: (mousePosition.y - window.innerHeight / 2) / 40 * multiplier,
  };
}

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Dots */}
        {[...Array(20)].map((_, i) => {
          const offset = getParallaxOffset(((i % 3) + 1) * 2, mousePosition);
          return (
            <div
              key={`dot-${i}`}
              className="absolute w-2 h-2 bg-gray-300 rounded-full opacity-40 transition-transform duration-300 ease-out"
              style={{
                left: `${10 + ((i * 4.5) % 80)}%`,
                top: `${15 + ((i * 7) % 70)}%`,
                transform: `translate(${offset.x}px, ${offset.y}px)`,
              }}
            />
          );
        })}

        {/* Larger Floating Circles */}
        {[...Array(8)].map((_, i) => {
          const offset = getParallaxOffset(((i % 2) + 1) * 3, mousePosition);
          return (
            <div
              key={`circle-${i}`}
              className="absolute rounded-full border border-gray-200 opacity-30 transition-transform duration-500 ease-out"
              style={{
                width: `${20 + i * 10}px`,
                height: `${20 + i * 10}px`,
                left: `${20 + ((i * 12) % 60)}%`,
                top: `${20 + ((i * 15) % 60)}%`,
                transform: `translate(${offset.x}px, ${offset.y}px)`,
              }}
            />
          );
        })}

        {/* Geometric Shapes */}
        <div
          className="absolute w-16 h-16 opacity-20 transition-transform duration-700 ease-out"
          style={{
            left: '15%',
            top: '25%',
            transform: `translate(${getParallaxOffset(4, mousePosition).x}px, ${getParallaxOffset(4, mousePosition).y}px) rotate(${mousePosition.x * 0.1}deg)`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-gray-400" fill="currentColor">
            <polygon points="50,10 90,90 10,90" />
          </svg>
        </div>

        <div
          className="absolute w-12 h-12 opacity-25 transition-transform duration-600 ease-out"
          style={{
            right: '20%',
            top: '30%',
            transform: `translate(${getParallaxOffset(-3, mousePosition).x}px, ${getParallaxOffset(-3, mousePosition).y}px) rotate(${-mousePosition.x * 0.05}deg)`,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="10" y="10" width="80" height="80" />
            <rect x="25" y="25" width="50" height="50" />
          </svg>
        </div>

        <div
          className="absolute w-20 h-20 opacity-15 transition-transform duration-800 ease-out"
          style={{
            left: '70%',
            bottom: '40%',
            transform: `translate(${getParallaxOffset(5, mousePosition).x}px, ${getParallaxOffset(5, mousePosition).y}px)`,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="10" />
          </svg>
        </div>

        {/* Connecting Lines that follow mouse */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10 transition-all duration-1000 ease-out"
          viewBox="0 0 1200 800"
          style={{
            transform: `translate(${getParallaxOffset(1, mousePosition).x}px, ${getParallaxOffset(1, mousePosition).y}px)`,
          }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(156, 163, 175)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(156, 163, 175)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d={`M100,200 Q${300 + mousePosition.x * 0.1},${100 + mousePosition.y * 0.05} 500,300`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1"
          />
          <path
            d={`M800,150 Q${600 + mousePosition.x * 0.08},${250 + mousePosition.y * 0.03} 400,400`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1"
          />
          <path
            d={`M200,600 Q${500 + mousePosition.x * 0.06},${500 + mousePosition.y * 0.04} 900,650`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="1"
          />
        </svg>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => {
          const offset = getParallaxOffset(((i % 4) + 1) * 1.5, mousePosition);
          return (
            <div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-30 transition-transform duration-400 ease-out"
              style={{
                left: `${5 + ((i * 6.2) % 90)}%`,
                top: `${10 + ((i * 8.5) % 80)}%`,
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedBackground; 