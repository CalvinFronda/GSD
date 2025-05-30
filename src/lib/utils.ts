import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserInitals(firstName: string, lastName: string) {
  return `${firstName[0]}${lastName[0]}`;
}
