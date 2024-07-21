import Markdown from 'react-markdown'

export const RichText = ({ data }) => {
  return (
    <div className="container prose prose-lg py-12">
      <Markdown>{data.content}</Markdown>
    </div>
  )
}
