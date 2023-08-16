import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ResponseArgs<T = unknown> = Partial<{ data: T; error: any; ok: boolean }>

interface ResponseHandler<T = unknown> {
  ok: boolean
  data: T
  error?: any
}

export function handler({
  ok,
  data,
  error = null,
}: ResponseArgs): ResponseHandler<typeof data> {
  return {
    ok: ok ?? (!!data || !error),
    data,
    error,
  }
}
