import React from 'react';
import './twinkle.css';

const TwinklingStars = () => {
  return (
    <div className="stars-container">
      {Array.from({ length: 50 }, (_, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default TwinklingStars;