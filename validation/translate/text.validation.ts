import { z } from 'zod'

const TranslateTextValidation = {
  POST: z
    .object({
      text: z.string({
        description: '번역할 내용',
        required_error: '번역할 텍스트를 입력해주세요!',
      }),
      from: z
        .string({
          description: '번역할 내용 언어 코드',
          required_error: '번역할 언어를 선택해주세요!',
        })
        .default('ko'),
      to: z.string({
        description: '번역할 언어 코드',
        required_error: '번역할 언어를 선택해주세요!',
      }),
    })
    .refine((arg) => arg.to !== arg.from, {
      message: '같은 언어로 번역할 수 없어요.',
    }),
}

export type Validation<T extends keyof typeof TranslateTextValidation> =
  z.infer<(typeof TranslateTextValidation)[T]>
export default TranslateTextValidation
