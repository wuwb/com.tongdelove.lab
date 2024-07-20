import Link from 'next/link'

const Belt = props => {
  return (
    <div className="w-full">
      <p>{props.content}</p>
      {props.link ? (
        <Link href={props.link}>
          <a>{props.linkTitle}</a>
        </Link>
      ) : (
        <div className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded px-4 py-2 text-white disabled:opacity-50">{props.button}</div>
      )}
    </div>
  )
}

export default Belt
