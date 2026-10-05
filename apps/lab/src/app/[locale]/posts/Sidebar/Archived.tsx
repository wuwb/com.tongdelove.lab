import Link from 'next/link'

function Archived() {
  return (
    <div>
      <h2>Archived</h2>
      <ul>
        <li>
          <Link href="/post/1">Post 1</Link>
        </li>
        <li>
          <Link href="/post/2">Post 2</Link>
        </li>
        <li>
          <Link href="/post/3">Post 3</Link>
        </li>
      </ul>
    </div>
  )
}

export default Archived
