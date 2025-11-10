'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Loader } from 'lucide-react';
import {Cart, CartItem} from '@/types'
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { addItemToCart } from '@/lib/actions/cart.actions';
import { removeItemFromCart } from '@/lib/actions/cart.actions';
import { useTransition } from 'react';
const AddToCart = ({cart, item}: {cart?: Cart,item: CartItem}) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending,startTransition] = useTransition();
    const handleAddToCart = async () => {
        startTransition(async ()=> {
        const response = await addItemToCart(item);

        if(!response.success){
            toast({
                variant: 'destructive',
                description: response.message
            });
            return;
        }
        //Handle success Cart
        toast({
            description:response.message,
            action: (
                <ToastAction className='bg-primary text-white hover:bg-gray-800' altText='Go To Cart' onClick={()=> router.push('/cart')}>Go To Cart</ToastAction>
            )
        })
        })

    }
    //handle remove from cart
    const handleRemoveFromCart = async ()=> {
        startTransition(async ()=> {
        const res = await removeItemFromCart(item.productId);
        toast({
            variant:res.success ? 'default' : 'destructive',
            description: res.message
        });
        return;
        })
    }
    //Check if item is in cart
    const existsItem = cart && cart.items.find((x)=> x.productId === item.productId);

    return ( existsItem ? (
        <div className='flex flex-row items-center justify-center'>
        <Button variant={'outline'} className='w-full' type='button' onClick={handleRemoveFromCart}>{isPending ? (<Loader className='h-4 w-4 animate-spin'></Loader>): (<Minus className='h-4 w-4'/>)}</Button><span className="px-2">{existsItem.qty}</span><Button variant={'outline'} className='w-full' type='button' onClick={handleAddToCart}>{isPending ? (<Loader className='h-4 w-4 animate-spin'></Loader>): (<Plus className='h-4 w-4'/>)}</Button>
        </div>) : (<Button className='w-full' type='button' onClick={handleAddToCart}>{isPending ? (<Loader className='h-4 w-4 animate-spin'></Loader>): (<Plus className='h-4 w-4'/>)}Add To Cart</Button>) );
}
 
export default AddToCart;