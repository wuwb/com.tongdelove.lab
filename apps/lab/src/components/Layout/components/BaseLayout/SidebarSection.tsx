

export const SidebarSection = ({
  title,
  children
}) => {
  return (
    <div className="border p-2.5">
      {title && (<div>{title}</div>)}
      <div>
        {children}
      </div>
    </div>
  )
}

