const NodeTagList = (props) => {
  return (
    <div>
      {props.data.map((item) => {
        return <div key={item}>{item}</div>
      })}
    </div>
  )
}

export default NodeTagList
