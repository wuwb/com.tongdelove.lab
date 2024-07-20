import Markdown from 'react-markdown'

const RichText = ({ data }) => {
  return (
    <div className="container prose prose-lg py-12">
      <Markdown>{data.content}</Markdown>
    </div>
  )
}

export default RichText
