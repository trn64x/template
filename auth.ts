import NextAuth from 'next-auth'
import {PrismaAdapter} from '@auth/prisma-adapter'
import {prisma} from '@/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export const config = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials:{
                email:{type:'email'},
                password:{type:"password"},

            },
            async authorize(credentials){
                if(credentials == null) return null;
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email as string
                    }
                });
                if(user && user.password){
                    const isMatch = compareSync(credentials.password as string, user.password);
                    if(isMatch){
                        return{ id:user.id,name:user.name,email:user.email,role:user.role}
                    }
                }
                return null
            }
            
        })
    ],
    callbacks:{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({session,user,trigger,token}:any) {
            //set user id from token
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;
            //if there is an update, set user name
            if(trigger === 'update'){
                session.user.name = user.name;
            }
            return session
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user}:any) {
            // Assign user fields to the token
            if(user){
                token.role = user.role;
                // If user does not have email use their email
                if(user.name === 'NO_NAME'){
                    token.name = user.email!.split('@')[0];

                    //Update database to reflect the token name
                    await prisma.user.update({
                        where: {id:user.id},
                        data: {name: token.name}
                    })
                }
            }
            return token;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        authorized({ request,auth }: any){
            // check for session cart cookie
            if(!request.cookies.get('sessionCartId')){
                // Generate new session CartId cookie
                const sessionCartId = crypto.randomUUID();

                // Clone the request headers
                const newRequestHeaders = new Headers(request.headers);
                //Create a new response and add the new headers
                const response = NextResponse.next({
                    request:{
                        headers: newRequestHeaders
                    }
                });
                //set newly generated session Cart Id in the response cookies
                response.cookies.set('sessionCartId', sessionCartId);
                return response;
            }else{
                return true
            }
        }
    }
} satisfies NextAuthConfig;
//satisfies makes sure if its good with NextAuthConfig type
export const  {handlers, auth,signIn,signOut} = NextAuth(config);