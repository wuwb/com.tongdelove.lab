interface SecondaryNavProps {
  children: React.ReactNode
}

export function SecondaryNav({ children }: SecondaryNavProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3">
      {children}
    </div>
  )
}
