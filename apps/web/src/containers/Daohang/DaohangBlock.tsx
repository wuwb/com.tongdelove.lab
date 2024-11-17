import { DaohangLink } from './DaohangLink'

export const DaohangBlock = (props) => {
  return (
    <div>
      {props.links.map((item) => (
        <div key={item} xs={12} sm={12} md={8} lg={8} xl={6}>
          <DaohangLink {...item} />
        </div>
      ))}
    </div>
  )
}
