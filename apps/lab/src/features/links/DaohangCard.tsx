export function DaohangCard(props) {
  const { item } = props
  return (
    <div>
      <a className="block rounded-md p-2.5 mb-2.5 leading-10 shadow-[0px 0px 20px -5px rgb(158 158 158 / 20%)]" href={item.path}>
        <div className="font-bold">{item.name}</div>
        <div className="text-[#888] font-sm">{item.desc}</div>
      </a>
    </div>
  )
}
