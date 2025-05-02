import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateName = (name: string) => {
  const filenameRegex = /^(?![ .])(?!.*[ .]$)(?!.*[/\\:*?"<>|]).{1,255}$/;
  return filenameRegex.test(name);
};
