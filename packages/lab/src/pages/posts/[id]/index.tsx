import { useRouter } from 'next/router'
import Link from 'next/link'

const Post = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <h1>Post: {id}</h1>
            <ul>
                <li>
                    <Link href="/post/[id]/[comment]" as={`/post/${id}/first-comment`}>
                        First comment
                    </Link>
                </li>
                <li>
                    <Link href="/post/[id]/[comment]" as={`/post/${id}/second-comment`}>
                        Second comment
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default Post
