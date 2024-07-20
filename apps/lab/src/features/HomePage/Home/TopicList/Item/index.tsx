import Image from 'next/legacy/image'

function Item(props) {
  const { title, image, author } = props
  return (
    <div className="flex">
      <div
        style={{
          width: '58px',
        }}
      >
        <Image src={image} alt={title} width="48" height="48" />
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <div>
          {title}
          <div>置顶</div>
        </div>
        <div>
          <a href="">最热</a>•<a href="">{author}</a>•<span>1年前发布</span>•
          <span>3分钟前更新</span>•<span>最后回复来自</span>•
          <a href="">xxxxxx</a>
        </div>
      </div>
      <div
        className=""
        style={{
          width: '70px',
        }}
      >
        80+
      </div>
    </div>
  )
}

export default Item
