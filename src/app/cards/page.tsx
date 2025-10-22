'use client';

import Header from '@/components/Header';
import Link from 'next/link';

export default function CardsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Header />
            <div className="pt-32 text-center px-4">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Cards are coming soon!</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Till then explore your dashboard.</p>
                <Link 
                    href="/dashboard"
                    className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}