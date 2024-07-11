export default function PostBody({ content }) {
  return (
    <div className="flex flex-row max-w-max box-border my-0 mx-auo">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
