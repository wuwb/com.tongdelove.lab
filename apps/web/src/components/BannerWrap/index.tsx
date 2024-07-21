export const BannerWrap = (props) => {
  return (
    <div
      className="py-10 text-center"
      style={{
        backgroundColor: props.bgColor,
      }}
    >
      {props.children}
    </div>
  )
}
