type Props = {
  content: string
}
const ArticleContent = (props: Props) => {
  return (
    <div className="mx-auto max-w-2xl">
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
  )
}

export default ArticleContent
