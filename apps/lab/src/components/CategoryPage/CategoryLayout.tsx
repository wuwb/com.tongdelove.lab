import { LinksSidebar } from '../LinksPage/LinksSidebar'

type CategoryLayoutProps = {
  children: React.ReactNode
}

export const CategoryLayout = (props: CategoryLayoutProps) => {
  return (
    <div className="flex">
      <div className="flex">
        <LinksSidebar />
        <div className="w-full grow p-2">{props.children}</div>
      </div>
    </div>
  )
}
