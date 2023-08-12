import { z } from 'zod'

const TranslateTextValidation = {
  POST: z.object({
    text: z.string({ description: '번역할 내용' }).min(1, {
      message: '번역할 텍스트를 입력해주세요!'
    }),
    from: z.string({ description: '번역할 내용 언어 코드' }).default('ko'),
    to: z.string({ description: '번역할 언어 코드' }),
  }),
}

export type Validation<T extends keyof typeof TranslateTextValidation> =
  z.infer<(typeof TranslateTextValidation)[T]>
export default TranslateTextValidation
