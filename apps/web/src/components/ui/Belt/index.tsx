import Link from "next/link";

const Belt = (props) => {
  return (
    <div className="w-full">
      <p>{props.content}</p>
      {props.link ? (
        <Link href={props.link}><a>{props.linkTitle}</a></Link>
      ) : (
        <div
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
        >
          {props.button}
        </div>
      )}
    </div>
  );
}

export default Belt;
