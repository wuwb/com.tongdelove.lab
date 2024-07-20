import React from 'react'

interface Props {
  component: any
  items?: any[]
}

function List(props: Props) {
  const ComponentToRender = props.component
  let content: any = <div />

  // If we have items, render them
  if (props.items) {
    content = props.items.map(item => (
      <ComponentToRender key={`item-${item.id}`} item={item} />
    ))
  } else {
    // Otherwise render a single component
    content = <ComponentToRender />
  }

  //   const Ul = styled.ul`
  //   list-style: none;
  //   margin: 0;
  //   width: 100%;
  //   max-height: 30em;
  //   overflow-y: auto;
  //   padding: 0 1em;
  // `;

  // const Wrapper = styled.div`
  //   padding: 0;
  //   margin: 0;
  //   width: 100%;
  //   background-color: white;
  //   border: 1px solid #ccc;
  //   border-radius: 3px;
  //   overflow: hidden;
  // `;

  return (
    <div className="radius-2 m-0 w-max overflow-hidden border bg-white p-0">
      <div className="">{content}</div>
    </div>
  )
}

export default List
