import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full">
              <img src="/healthBroken.svg" alt="Google logo" className="w-15 h-15" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-700 mb-6">
            Your Mental Health
            <span className="text-pink-600 block">Matters</span>
          </h1>

          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover thoughtfully crafted cards and resources designed to support your mental wellness journey.
            Find comfort, inspiration, and practical tools for better mental health.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2">
              <ArrowRight className="h-5 w-5" />
              <a href="#cards">Explore Cards</a>
            </button>
            <button className="border-2 border-pink-600 text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;