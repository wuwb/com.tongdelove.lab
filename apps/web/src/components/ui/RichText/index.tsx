import Markdown from 'react-markdown'

export const RichText = ({ data }) => {
  return (
    <div className="prose prose-lg container py-12">
      <Markdown>{data.content}</Markdown>
    </div>
  )
}
