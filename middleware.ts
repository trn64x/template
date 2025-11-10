import { NextResponse } from 'next/server'

export function middleware(request) {
  // tylko cookie dla sessionCartId
  if (!request.cookies.get('sessionCartId')) {
    const res = NextResponse.next()
    res.cookies.set('sessionCartId', crypto.randomUUID())
    return res
  }

  return NextResponse.next()
}