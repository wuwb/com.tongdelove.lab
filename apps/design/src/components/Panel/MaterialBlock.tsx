import { SubTitle } from './SubTitle'

interface MaterialBlockProps {
  title: string
  handleShowMore: () => void
  children: React.ReactNode
}

export const MaterialBlock = (props: MaterialBlockProps) => {
  const { title, handleShowMore, children } = props

  return (
    <div>
      <div>
        <SubTitle title={title} />
        <div onClick={handleShowMore}>更多</div>
      </div>
      <div>{children}</div>
    </div>
  )
}
