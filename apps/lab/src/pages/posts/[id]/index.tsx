import Link from 'next/link'
import { useSearchParams } from 'next/navigation';

const Post = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

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
