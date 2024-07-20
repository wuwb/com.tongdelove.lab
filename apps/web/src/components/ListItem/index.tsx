import React from 'react'

interface Props {
  item: any
}

function ListItem(props: Props) {
  //   const Wrapper = styled.li`
  //   width: 100%;
  //   height: 3em;
  //   display: flex;
  //   align-items: center;
  //   position: relative;
  //   border-top: 1px solid #eee;

  //   &:first-child {
  //     border-top: none;
  //   }
  // `;

  //   const Item = styled.div`
  //   display: flex;
  //   justify-content: space-between;
  //   width: 100%;
  //   height: 100%;
  //   align-items: center;
  // `;

  return (
    <div>
      <div>{props.item}</div>
    </div>
  )
}

export default ListItem
