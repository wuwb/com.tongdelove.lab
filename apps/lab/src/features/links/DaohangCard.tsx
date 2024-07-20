export function DaohangCard(props) {
  const { item } = props
  return (
    <div>
      <a
        className="shadow-[0px 0px 20px -5px rgb(158 158 158 / 20%)] mb-2.5 block rounded-md p-2.5 leading-10"
        href={item.path}
      >
        <div className="font-bold">{item.name}</div>
        <div className="font-sm text-[#888]">{item.desc}</div>
      </a>
    </div>
  )
}
