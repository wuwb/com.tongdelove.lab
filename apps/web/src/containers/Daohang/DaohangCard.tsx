import Image from 'next/image';
import styled from '@emotion/styled';
import DaohangBlock from './DaohangBlock';
import s from './DaohangCard.module.css';

const DaohangCard = (props) => {
  return (
    <div className={s.part} data-title={props.title}>
      <h2 className="has_link">
        <span className="font-bold">{props.title}</span>
        { props.link ? <a href={props.link} target="_blank">更多 &gt;</a> : null }
      </h2>
      <div className={s.items}>
        <DaohangBlock links={props.links} />
      </div>
    </div>
  )
}

export default DaohangCard;
