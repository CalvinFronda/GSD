import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// TODO: after we get full names
export function getUserInitals(name: string) {
  let [first, last] = name.split(" ");
  return `${first[0]}${last[0]}`;
}
