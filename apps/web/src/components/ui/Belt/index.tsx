import Link from 'next/link'

export const Belt = (props) => {
  return (
    <div className="w-full">
      <p>{props.content}</p>
      {props.link ? (
        <Link href={props.link}>{props.linkTitle}</Link>
      ) : (
        <div className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">
          {props.button}
        </div>
      )}
    </div>
  )
}
