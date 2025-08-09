// src/components/ui/avatar.tsx (for reference, your component likely already exists)
"use client";

import * as React from "react"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string,
  alt?: string,
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-100 ${className || ""}`}
      {...props}
    />
  )
)
Avatar.displayName = "Avatar"

export const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ src, alt, className, ...props }, ref) => (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className || ""}`}
      {...props}
    />
  )
)
AvatarImage.displayName = "AvatarImage"

export const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center justify-center w-full h-full text-gray-500 ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  )
)
AvatarFallback.displayName = "AvatarFallback"
