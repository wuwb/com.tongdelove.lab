export const PostBody = ({ content }) => {
  return (
    <div className="mx-auo my-0 box-border flex max-w-max flex-row">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
