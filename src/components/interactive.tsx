import { useState, useEffect } from "react";

interface MousePosition {
    x: number
    y: number
}
  
export default function Interactive() {
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        })
      }
  
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])
  
    // Calculate more subtle parallax offsets
    const getParallaxOffset = (intensity: number) => ({
      x: (mousePosition.x - (typeof window !== "undefined" ? window.innerWidth / 2 : 0)) * intensity * 0.005,
      y: (mousePosition.y - (typeof window !== "undefined" ? window.innerHeight / 2 : 0)) * intensity * 0.005,
    })
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Improved Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle Floating Dots */}
          {[...Array(12)].map((_, i) => {
            const offset = getParallaxOffset(((i % 3) + 1) * 1.5)
            return (
              <div
                key={`dot-${i}`}
                className="absolute rounded-full bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 transition-all duration-700 ease-out animate-pulse"
                style={{
                  width: `${4 + (i % 3) * 2}px`,
                  height: `${4 + (i % 3) * 2}px`,
                  left: `${15 + ((i * 7) % 70)}%`,
                  top: `${20 + ((i * 9) % 60)}%`,
                  transform: `translate(${offset.x}px, ${offset.y}px)`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + (i % 2)}s`,
                }}
              />
            )
          })}
  
          {/* Elegant Floating Circles */}
          {[...Array(5)].map((_, i) => {
            const offset = getParallaxOffset(((i % 2) + 1) * 2)
            return (
              <div
                key={`circle-${i}`}
                className="absolute rounded-full border opacity-15 transition-all duration-1000 ease-out"
                style={{
                  width: `${40 + i * 20}px`,
                  height: `${40 + i * 20}px`,
                  left: `${10 + ((i * 18) % 70)}%`,
                  top: `${15 + ((i * 22) % 70)}%`,
                  borderColor: `hsl(${220 + i * 10}, 30%, 70%)`,
                  borderWidth: "1px",
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${1 + Math.sin(Date.now() * 0.001 + i) * 0.1})`,
                }}
              />
            )
          })}
  
          {/* Refined Geometric Shapes */}
          <div
            className="absolute opacity-10 transition-all duration-1000 ease-out"
            style={{
              left: "20%",
              top: "30%",
              transform: `translate(${getParallaxOffset(3).x}px, ${getParallaxOffset(3).y}px) rotate(${mousePosition.x * 0.05}deg)`,
            }}
          >
            <svg viewBox="0 0 60 60" className="w-12 h-12 text-blue-400" fill="currentColor">
              <polygon points="30,5 55,50 5,50" opacity="0.6" />
            </svg>
          </div>
  
          <div
            className="absolute opacity-12 transition-all duration-800 ease-out"
            style={{
              right: "25%",
              top: "40%",
              transform: `translate(${getParallaxOffset(-2).x}px, ${getParallaxOffset(-2).y}px) rotate(${-mousePosition.y * 0.03}deg)`,
            }}
          >
            <svg
              viewBox="0 0 50 50"
              className="w-10 h-10 text-purple-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="10" y="10" width="30" height="30" rx="4" opacity="0.7" />
            </svg>
          </div>
  
          <div
            className="absolute opacity-8 transition-all duration-1200 ease-out"
            style={{
              left: "65%",
              bottom: "35%",
              transform: `translate(${getParallaxOffset(4).x}px, ${getParallaxOffset(4).y}px)`,
            }}
          >
            <svg
              viewBox="0 0 80 80"
              className="w-16 h-16 text-indigo-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="40" cy="40" r="30" opacity="0.4" />
              <circle cx="40" cy="40" r="15" opacity="0.6" />
            </svg>
          </div>
  
          {/* Smooth Connecting Lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-8 transition-all duration-1500 ease-out"
            viewBox="0 0 1200 800"
            style={{
              transform: `translate(${getParallaxOffset(0.8).x}px, ${getParallaxOffset(0.8).y}px)`,
            }}
          >
            <defs>
              <linearGradient id="smoothGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(147, 197, 253)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="rgb(196, 181, 253)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="rgb(252, 165, 165)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path
              d={`M150,250 Q${400 + mousePosition.x * 0.05},${150 + mousePosition.y * 0.02} 600,350`}
              fill="none"
              stroke="url(#smoothGradient)"
              strokeWidth="1.5"
            />
            <path
              d={`M700,200 Q${500 + mousePosition.x * 0.03},${300 + mousePosition.y * 0.015} 300,450`}
              fill="none"
              stroke="url(#smoothGradient)"
              strokeWidth="1"
            />
          </svg>
  
          {/* Gentle Floating Particles */}
          {[...Array(8)].map((_, i) => {
            const offset = getParallaxOffset(((i % 3) + 1) * 1)
            return (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full bg-gradient-to-r from-blue-200 to-purple-200 opacity-25 transition-all duration-500 ease-out"
                style={{
                  width: `${2 + (i % 2)}px`,
                  height: `${2 + (i % 2)}px`,
                  left: `${20 + ((i * 11) % 60)}%`,
                  top: `${25 + ((i * 13) % 50)}%`,
                  transform: `translate(${offset.x}px, ${offset.y}px) translateY(${Math.sin(Date.now() * 0.002 + i) * 10}px)`,
                }}
              />
            )
          })}
  
          {/* Ambient Glow Effects */}
          <div
            className="absolute w-32 h-32 rounded-full opacity-5 transition-all duration-2000 ease-out"
            style={{
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
              left: "10%",
              top: "20%",
              transform: `translate(${getParallaxOffset(1).x}px, ${getParallaxOffset(1).y}px)`,
            }}
          />
          <div
            className="absolute w-40 h-40 rounded-full opacity-4 transition-all duration-2500 ease-out"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
              right: "15%",
              bottom: "25%",
              transform: `translate(${getParallaxOffset(-1.5).x}px, ${getParallaxOffset(-1.5).y}px)`,
            }}
          />
          </div>
        </div>
    )
}
