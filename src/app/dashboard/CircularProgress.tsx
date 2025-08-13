import React from "react";
import { dailyGoal } from "../../../data/data";

export default function CircularProgress({ value, size = 80 }: { value: number; size?: number }) {
    const progressPercentage = Math.floor((value / dailyGoal) * 100);
    const radius = (size - 8) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = Math.floor(circumference - (progressPercentage / 100) * circumference);

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={4}
                    fill="transparent"
                    className="text-gray-200"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#progressGradient)"
                    strokeWidth={4}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-700">{progressPercentage}%</span>
            </div>
        </div>
    );
}