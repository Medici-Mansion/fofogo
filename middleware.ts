import {
  authMiddleware,
  redirectToSignIn,
  withClerkMiddleware,
} from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({})

// authMiddleware({})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
