import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stripTime = (date: Date | string) => {
  const parsedDate = new Date(date);
  parsedDate.setHours(0, 0, 0, 0);
  return parsedDate.getTime();
};
