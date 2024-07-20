import Image from 'next/image'
import styled from '@emotion/styled'
import s from './DaohangLink.module.css'

export const DaohangLink = (props) => {
  return (
    <div className={s.item}>
      <a href={props.link} target="_blank" rel="noreferrer">
        {props.image ? <Image src={props.image} alt={props.title} /> : null}
        <h3>{props.title}</h3>
        {props.descriptin ? <p>{props.descriptin}</p> : null}
      </a>
    </div>
  )
}
