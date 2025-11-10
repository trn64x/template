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
// format number
export function formatNumberWithDecimal(num:number):string {
  const [int,decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}
// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error:any) {
if (error.name === 'ZodError') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fieldErrors = error.issues.map((issue: { message: any; }) => issue.message);
  return fieldErrors.join('. ');
}
else if (error.name === 'PrismaClientKnownRequestError' && error.code === "P2002") {
  //Handle Prisma error
  const field = error.meta?.target ? error.meta.target[0] : 'Field';
  return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
  }else{
    //Handle Other errors
    return typeof error.message === 'string' ? error.message : JSON.stringify(error.message)
  }
}
// ROUND NUMBER TO 2 DECIMAL PLACES
export function round2(value:number | string){
  if(typeof value === 'number'){
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }else if(typeof value === 'string'){
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  }else{
    throw new Error("value must be a string or number")
  }
}