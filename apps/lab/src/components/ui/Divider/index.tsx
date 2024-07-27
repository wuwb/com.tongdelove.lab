interface DividerProps {
  children: React.ReactNode
}

export const Divider = (props: DividerProps) => {
  return <div className="my-4 h-px w-full">{props.children}</div>
}
