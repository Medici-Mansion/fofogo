'use client'
export default function Error({ error }: { error: any }) {
  console.log(error, '<error')
  return <div>ERROR! : {error.message}</div>
}
