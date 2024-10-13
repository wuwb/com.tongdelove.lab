interface SubTitleProps {
  title: string
}

export const SubTitle = (props: SubTitleProps) => {
  return <div className="font-bold">{props.title}</div>
}
