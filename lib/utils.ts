import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert prisma object into a regular JS object
// T to jest generic typescript czyli to może być string,number,decimal itp.
export function convertToPlainObject<T>(value: T):T{
  return JSON.parse(JSON.stringify(value));
}