import { DaohangBlock } from './DaohangBlock'
import s from './DaohangCard.module.css'

export const DaohangCard = (props) => {
  return (
    <div className={s.part} data-title={props.title}>
      <h2 className="has_link">
        <span className="font-bold">{props.title}</span>
        {props.link ? (
          <a href={props.link} target="_blank" rel="noreferrer">
            更多 &gt;
          </a>
        ) : null}
      </h2>
      <div className={s.items}>
        <DaohangBlock links={props.links} />
      </div>
    </div>
  )
}
