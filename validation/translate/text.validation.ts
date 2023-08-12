import { z } from 'zod'
const TranslateTextValidation = {
  POST: z.object({
    text: z.string({ description: '번역할 내용' }),
    from: z.string({ description: '번역할 내용 언어 코드' }).default('ko'),
    to: z.string({ description: '번역할 언어 코드' }),
  }),
}

export default TranslateTextValidation
