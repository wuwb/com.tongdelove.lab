import { DaohangLink } from './DaohangLink'

export const DaohangBlock = (props) => {
  return (
    <div>
      {props.links.map((item) => (
        <div key={item}>
          <DaohangLink {...item} />
        </div>
      ))}
    </div>
  )
}
