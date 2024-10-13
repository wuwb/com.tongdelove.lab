import React, { useState } from 'react'
import { MaterialBlock } from './MaterialBlock'

const MaterialPanel = () => {
  const [showMore, setShowMore] = useState(false)
  const handleShowMore = () => {
    setShowMore(true)
  }

  const handleGoBack = () => {
    setShowMore(false)
  }

  const sharp = [
    {
      id: '1',
      src: '',
      type: 'img',
      canSetColor: true,
      isCutout: false,
      fills: [
        {
          color: 'rgba(0,0,0,1)',
          type: 'glbalFill',
        },
      ],
    },
  ]

  return (
    <div>
      {showMore ? (
        <div>
          <div onClick={handleGoBack}>返回</div>
          <div></div>
        </div>
      ) : (
        <>
          <MaterialBlock title="形状" handleShowMore={handleShowMore}>
            {sharp.map((item) => (
              <div key={item.id}>
                <img src={item.src} />
              </div>
            ))}
          </MaterialBlock>
          <MaterialBlock
            title="文字"
            handleShowMore={handleShowMore}
          ></MaterialBlock>
          <MaterialBlock
            title="图标"
            handleShowMore={handleShowMore}
          ></MaterialBlock>
          <MaterialBlock
            title="插画"
            handleShowMore={handleShowMore}
          ></MaterialBlock>
          <MaterialBlock
            title="抠图"
            handleShowMore={handleShowMore}
          ></MaterialBlock>
        </>
      )}
    </div>
  )
}

export default MaterialPanel
