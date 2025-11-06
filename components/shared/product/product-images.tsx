'use client'
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
const ProductImages = ({images}:{images:string[]}) => {
    const [current,setCurrent] = useState(0);
    return ( 
    <div className="space-y-4">
        <Image src={images[current]} alt={"Image of product"} width={1000} height={1000} priority={true} className="min-h-[300px] object-cover object-center"></Image>
        <div className="flex">
            {images.map((image:string,index)=>(
                <div onClick={()=> setCurrent(index)} className={cn('border mr-2 cursor-pointer hover:border-orange-600', current === index && 'border-orange-500')} key={index}><Image width={100} height={100} src={image} alt="Select Next Photo"/></div>
            ))}
        </div>
    </div> 
    );
}
 
export default ProductImages;