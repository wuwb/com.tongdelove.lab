'use client'

import { useRouter } from '@/lib/compat/router'

const Comment = () => {
  const router = useRouter()
  const { id, comment } = router.query

  return (
    <>
      <h1>Post: {id}</h1>
      <h1>Comment: {comment}</h1>
    </>
  )
}

export default Comment
