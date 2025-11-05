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
export function formatNumberWithDecimal(num:number):string{
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2,'0')}` : `${int}.00`
}