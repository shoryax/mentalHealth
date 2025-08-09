import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/healthBroken.svg" alt="Google logo" className="w-5 h-5" />
              <span className="text-xl font-semibold">
                Cards for Mental Health
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Supporting mental wellness through thoughtfully designed resources and tools. 
              Your journey to better mental health starts here.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-pink-400" />
                <span className="text-gray-300">support@cardsformentalhealth.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-pink-400" />
                <span className="text-gray-300">1-800-MENTAL-H</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-pink-400" />
                <span className="text-gray-300">Supporting globally</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#cards" className="text-gray-300 hover:text-white transition-colors">Cards</a></li>
              <li><a href="#resources" className="text-gray-300 hover:text-white transition-colors">Resources</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Crisis Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Find a Therapist</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Cards for Mental Health. Made with ❤️ for mental wellness.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            If you're experiencing a mental health crisis, please contact emergency services or a crisis hotline immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;