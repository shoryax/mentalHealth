"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FAQ = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLDivElement>();
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
    <div
      ref={sectionRef}
      className={`bg py-12 transition-all duration-500 ease-out ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our mental health resources
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible key={index} className="bg-white/70 rounded-lg">
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

export default FAQ;
