'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Menu, User, Sun, Moon } from 'lucide-react';
import '../app/globals.css';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import { useDarkMode } from './DarkModeProvider';

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
    <header className={`fixed top-0 left-1/2 -translate-x-1/2 w-3/4 mt-8 mb-16 backdrop-blur-lg rounded-2xl z-50 transition-colors duration-300 ${isDarkMode
      ? 'bg-gray-900/20 text-white'
      : 'bg-white/5 text-gray-700'
      }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src="/healthBroken.svg" alt="Google logo" className="w-10 h-10" />
            <span className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'
              }`}>
              Cards for Mental Health
            </span>
          </div>
          <nav className="hidden md:flex space-x-7 items-center">
            <a href="/" className={`hover:text-pink-600 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
              Home
            </a>
            <a href="#about" className={`hover:text-pink-600 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
              About
            </a>
            {user ? (
              <Link href="/dashboard" className={`hover:text-pink-600 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Dashboard
              </Link>
            ) : (
              <a href="#contact" className={`hover:text-pink-600 transition-colors duration-300 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                Contact
              </a>
            )}

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 hover:bg-opacity-20 ${isDarkMode
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
                  className={`flex items-center bg-pink-100 rounded-lg space-x-2 px-2 py-1.5 hover:bg-opacity-20 transition-colors duration-300 ${isDarkMode ? 'hover:bg-white/20' : 'hover:bg-gray-200'
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
                  <span className={`text-sm px-2 py-1 transition-colors duration-300 ${isDarkMode
                    ? 'text-white '
                    : 'text-[#000000]'
                    }`}>
                    {displayName}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-40 backdrop-blur-md border z-50 rounded-lg transition-colors duration-300 ${isDarkMode
                    ? 'bg-gray-800/20 border-gray-600/50'
                    : 'bg-pink-100/20 border-pink-200/50'
                    }`}>
                    <Link
                      href="/settings"
                      className={`block px-4 py-2 text-sm transition-colors duration-300 ${isDarkMode
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
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-300 ${isDarkMode
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
                className={`flex items-center space-x-2 transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-pink-400' : 'text-gray-700 hover:text-pink-600'
                  }`}
              >
                <User className={`h-6 w-6 ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`} />
                <span>Sign In</span>
              </button>
            )}
          </nav>

          <button className={`md:hidden p-2 rounded-md transition-colors duration-300 ${isDarkMode ? 'text-gray-300 hover:text-pink-400' : 'text-gray-700 hover:text-pink-600'
            }`}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;