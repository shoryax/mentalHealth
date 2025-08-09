"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Brain, Users, Shield, Zap, Smile, Sun, Leaf, Star, Quote, Mail, Phone, MapPin, ChevronDown, ArrowRight, Menu, User, Moon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import '../app/globals.css';

//This contains all the things in one file, maybe used in future!

// DarkModeProvider
interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

interface DarkModeProviderProps {
  children: React.ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Header
const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(true);
  };

  const profileUrl = user?.user_metadata?.avatar_url;
  const fullName = user?.user_metadata?.full_name;
  const displayName = fullName ? fullName.split(' ')[0] : user?.email;

  return (
    <header className={`fixed top-0 left-0 right-0 w-3/4 mx-auto mt-8 mb-16 backdrop-blur-lg shadow-xl rounded-2xl z-50 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900/20 text-white-400' 
        : 'bg-white/5 text-gray-700'
    }`}>      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src="/healthBroken.svg" alt="Google logo" className="w-10 h-10" />
            <span className={`text-xl font-semibold transition-colors duration-300 ${
              isDarkMode ? 'text-white-400' : 'text-gray-700'
            }`}>
              Cards for Mental Health
            </span>
          </div>

          <nav className="hidden md:flex space-x-7 items-center">
            <a href="#home" className={`hover:text-pink-600 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Home
            </a>
            <a href="#about" className={`hover:text-pink-600 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              About
            </a>
            <div></div>
            {user ? (
              <Link href="/dashboard" className={`hover:text-pink-600 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Dashboard
              </Link>
            ) : (
              <a href="#contact" className={`hover:text-pink-600 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Contact
              </a>
            )}

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 hover:bg-opacity-20 ${
                isDarkMode 
                  ? 'hover:bg-white/20 text-yellow-400' 
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center space-x-2 px-2 py-1.5 rounded hover:bg-opacity-20 transition-colors duration-300 ${
                    isDarkMode ? 'hover:bg-white/20' : 'hover:bg-gray-200'
                  }`}
                >
                  {profileUrl ? (
                    <img
                      src={profileUrl}
                      alt="Profile"
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-pink-400"
                    />
                  ) : (
                    <User className={`h-6 w-6 ${isDarkMode ? 'text-pink-300' : 'text-pink-100'}`} />
                  )}
                  <span className={`text-sm rounded-full px-2 py-1 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-white bg-pink-900/50' 
                      : 'text-gray-700 bg-pink-100'
                  }`}>
                    {displayName}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-40 backdrop-blur-md border z-50 rounded-lg transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800/20 border-gray-600/50' 
                      : 'bg-pink-100/20 border-pink-200/50'
                  }`}>
                    <Link
                      href="/settings"
                      className={`block px-4 py-2 text-sm transition-colors duration-300 ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-700/50' 
                          : 'text-gray-700 hover:bg-pink-200/50'
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <img src="/settings.svg" alt="Settings" className="inline-block w-5 h-5 mr-2" />
                      Settings
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-300 ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-700/50' 
                          : 'text-gray-700 hover:bg-pink-200/50'
                      }`}
                    >
                      <img src="exit.svg" alt="Sign Out" className="inline-block w-5 h-5 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className={`flex items-center space-x-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300 hover:text-pink-400' : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                <User className={`h-6 w-6 ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`} />
                <span>Sign In</span>
              </button>
            )}
          </nav>

          <button className={`md:hidden p-2 rounded-md transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300 hover:text-pink-400' : 'text-gray-700 hover:text-pink-600'
          }`}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

// Hero
const Hero = () => {
  return (
    <section id="home" className="pt-32">
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

// FeaturedCards
const FeaturedCards = () => {
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
    <section id="cards" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Featured Mental Health Cards
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Each card is designed to provide you with practical tools and gentle reminders for your mental wellness
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

// Categories
const Categories = () => {
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
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the support you need with our organized collection of mental health resources
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group hover:scale-105"
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

// Testimonials
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
      className={`py-20 bg-blue-50 rounded-t-[3rem] transition-all duration-500 ease-out ${
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

// FAQs
const FAQ = () => {
  const faqs = [
    {
      question: "How do mental health cards work?",
      answer:
        "Our mental health cards are designed to provide quick, accessible support through guided exercises, affirmations, and coping strategies. Each card contains evidence-based techniques that you can use anytime, anywhere.",
    },
    {
      question: "Are these cards a replacement for therapy?",
      answer:
        "No, our cards are meant to supplement, not replace, professional mental health care. They're tools for daily wellness support. If you're experiencing serious mental health concerns, please consult with a qualified mental health professional.",
    },
    {
      question: "How often should I use the cards?",
      answer:
        "You can use the cards as often as you need them. Many people find daily use helpful for maintaining mental wellness, while others use them during challenging moments. Listen to your needs and use them at your own pace.",
    },
    {
      question: "Can I use these cards offline?",
      answer:
        "Yes! Once you've accessed the cards, many of the techniques and exercises can be practiced without an internet connection. We're also working on offline functionality for the app.",
    },
    {
      question: "Are the cards suitable for all ages?",
      answer:
        "Our cards are designed primarily for adults and teens (13+). Some content may not be appropriate for younger children. We recommend parental guidance for users under 16.",
    },
    {
      question: "What if I'm having a mental health crisis?",
      answer:
        "If you're experiencing a mental health emergency, please contact emergency services (911) or a crisis hotline immediately. Our cards are for ongoing support, not crisis intervention.",
    },
  ];

  return (
    <div className="">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our mental health resources
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible key={index} className="bg-gray-50 rounded-lg">
              <CollapsibleTrigger className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-100 transition-colors rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown className="h-5 w-5 text-gray-500 transform transition-transform duration-200 data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions? We're here to help.</p>
          <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

// Footer
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

// Main Page
const Nigga = () => {
  return (
    <DarkModeProvider>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <FeaturedCards />
        <Categories />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
    </DarkModeProvider>
  );
};

export default Nigga;