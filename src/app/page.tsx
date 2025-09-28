import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedCards from '../components/FeaturedCards';
import Categories from '../components/Categories';
import Testimonials from '../components/hope';
import Footer from '../components/Footer';
import FAQ from '../components/faqs';
import './globals.css';

const Page = () => {
  return (
      <div className="min-h-screen">
        <Header />
        <Hero />
        <FeaturedCards />
        <Categories />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
  );
};

export default Page;
