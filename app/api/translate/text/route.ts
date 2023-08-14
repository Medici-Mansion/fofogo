import prismadb from '@/lib/prismadb'
import { handler } from '@/lib/utils'
import { Role } from '@/prisma'
import TranslateTextValidation from '@/validation/translate/text.validation'
import { auth } from '@clerk/nextjs'
import { v2 } from '@google-cloud/translate'
import { NextRequest, NextResponse } from 'next/server'

const PAGE_TAKE = 10

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') || 0)

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
      createdAt: 'desc',
    },
    skip: PAGE_TAKE * page,
    take: PAGE_TAKE,
  })
  const total = await prismadb.message.count({
    where: {
      userId,
    },
  })

  return NextResponse.json(
    handler({
      data: {
        chats: result,
        count: result.length,
        hasNext: result.length === 10,
        total,
      },
    })
  )
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
    await prismadb.message.create({
      data: {
        content: text,
        role: Role.user,
        userId,
        languageId: from,
      },
    })
    await prismadb.message.create({
      data: {
        content: result,
        role: Role.system,
        userId,
        languageId: to,
      },
    })
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(1)
    //   }, 10000)
    // })
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
