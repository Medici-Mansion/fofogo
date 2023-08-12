import prismadb from '@/lib/prismadb'
import { handler } from '@/lib/utils'
import { Role } from '@/prisma'
import TranslateTextValidation from '@/validation/translate/text.validation'
import { auth } from '@clerk/nextjs'
import { v2 } from '@google-cloud/translate'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json(
      handler({
        error: {
          message: '로그인이 필요합니다 로그인해주세요.',
        },
      }),
      {
        status: 401,
      }
    )
  }

  const result = await prismadb.message.findMany({
    where: {
      userId,
    },
    select: {
      content: true,
      createdAt: true,
      id: true,
      role: true,
      updatedAt: true,
      language: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return NextResponse.json(handler({ data: result }))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        handler({
          error: {
            message: '로그인이 필요합니다 로그인해주세요.',
          },
        }),
        {
          status: 401,
        }
      )
    }
    const validation = TranslateTextValidation.POST.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        handler({
          error: {
            message: '꼭 필요한 정보가 누락됬어요.',
            detail: validation.error,
          },
        }),
        {
          status: 400,
        }
      )
    }
    const {
      data: { from, text, to },
    } = validation
    const translate = new v2.Translate({
      key: process.env.GOOGLE_TRANSLATE_API_KEY,
    })
    const [result] = await translate.translate(text, {
      from,
      to,
    })

    const re = await prismadb.message.createMany({
      data: [
        {
          content: text,
          role: Role.user,
          userId,
          languageId: from,
        },
        {
          content: result,
          role: Role.system,
          userId,
          languageId: to,
        },
      ],
    })

    return NextResponse.json(handler({ data: result }))
  } catch (error) {
    return NextResponse.json(
      handler({
        error: {
          message: '서버 접속이 원할하지 않아요.',
        },
      }),
      {
        status: 500,
      }
    )
  }
}
