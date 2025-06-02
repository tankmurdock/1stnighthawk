import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const animations = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  slideInLeft: "animate-slide-in-left",
  slideInRight: "animate-slide-in-right",
  bounceShow: "animate-bounce-slow",
  pulseSlow: "animate-pulse-slow",
  float: "animate-float",
  glow: "animate-glow",
};

export const glassMorphism = {
  light: "glass",
  dark: "glass-dark",
};

export const gradients = {
  primary: "bg-gradient-to-r from-primary-500 to-primary-600",
  secondary: "bg-gradient-to-r from-accent-500 to-accent-600",
  sunset: "bg-gradient-to-r from-orange-400 via-red-500 to-pink-500",
  ocean: "bg-gradient-to-r from-blue-500 to-teal-500",
  forest: "bg-gradient-to-r from-green-400 to-emerald-500",
  cosmic: "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
};

export const shadows = {
  soft: "shadow-lg",
  medium: "shadow-xl",
  hard: "shadow-2xl",
  colored: "shadow-lg shadow-primary-500/25",
  glow: "shadow-2xl shadow-primary-500/50",
};
