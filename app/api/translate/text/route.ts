import { handler } from '@/lib/utils'
import TranslateTextValidation from '@/validation/translate/text.validation'
import { v2 } from '@google-cloud/translate'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const validation = TranslateTextValidation.POST.safeParse(req.body)
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

  return NextResponse.json(handler({ data: result }))
}
