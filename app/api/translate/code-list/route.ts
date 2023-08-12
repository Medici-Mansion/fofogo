import prismadb from '@/lib/prismadb'
import { handler } from '@/lib/utils'

import { NextResponse } from 'next/server'
export async function GET() {
  try {
    const result = await prismadb.language.findMany()
    return NextResponse.json(handler({ data: result }))

  } catch (error) {
    return new NextResponse('Error', { status: 500 })
  }
}
