export interface Response<T> {
  ok: boolean
  error?: any
  data: T
}
