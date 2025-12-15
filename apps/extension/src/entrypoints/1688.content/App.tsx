import React, { useEffect, useRef, useState } from 'react'

import { REPLACE_BEARER_TOKEN, SUPPLY_TABLE_KEY, TEABLE_ROOT } from '@/constants/app'
import { removeParamsFromPath } from '@/utils/utils'

function App() {
  const [factoryInfo, setFactoryInfo] = useState<any>({
    address: '',
    afterSalesExperience: 0,
    consultingExperience: 0,
    logisticsExperience: 0,
    productExperience: 0,
    returnRate: 0,
    scroll: 0,
    title: '',
    url: '',
    year: 0,
  })
  const longLivedMessageList = useRef<HTMLUListElement>(null)

  const [helloResponsePre, sethelloResponsePre] = useState('Waiting for message to be sent...')
  const [unknownResponsePre, setunknownResponsePre] = useState('Waiting for message to be sent...')

  const sendHelloMessageBtn = async () => {
    try {
      const response = await browser.runtime.sendMessage({
        name: 'Aaron',
        type: 'hello',
      })
      console.log({ response })
      console.log('response: ', response)
      sethelloResponsePre(JSON.stringify(response))
    } catch (err: any) {
      sethelloResponsePre(`ERROR: ${err.message}`)
    }
  }

  const sendUnknownMessageBtn = async () => {
    try {
      const response = await browser.runtime.sendMessage({ type: 'unknown' })
      console.log({ response })
      console.log('response: ', response)

      setunknownResponsePre(JSON.stringify(response))
    } catch (err: any) {
      setunknownResponsePre(`ERROR: ${err.message}`)
    }
  }

  const handleCollectFactoryInfo = async () => {
    // https://sale.1688.com/factory/
    console.log('path: ', window.location.href)

    const url = new URL(`${TEABLE_ROOT}/api/table/${SUPPLY_TABLE_KEY}/record`)
    const data = {
      fieldKeyType: 'id',
      order: {
        anchorId: 'string',
        position: 'before',
        viewId: 'string',
      },
      records: [
        {
          fields: {
            产品: ['自发热包'],
            供应商名称: '万载县易蒸科技有限公司',
            地址: '江西省宜春市万载县株潭镇株山村',
            备注: '（透明袋）物流/包专票',
            联系人: '何新',
            联系电话: '13065173936',
          },
        },
      ],
      typecast: true,
    }
    const options = {
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${REPLACE_BEARER_TOKEN}`,
        'content-type': 'application/json',
      },
      method: 'POST',
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCollectImages = () => {
    const mainImageDoms = document.querySelectorAll('.detail-gallery-img')
    const mainImages = []
    for (let i = 0; i < mainImageDoms.length; i++) {
      if (mainImageDoms[i].tagName === 'IMG') {
        mainImages.push(mainImageDoms[i]?.src)
      }
    }
    console.log('main images: ', mainImages)

    const detailImageDoms = document.querySelectorAll('.detail img')
    const detailImages = []
    for (let i = 0; i < detailImageDoms.length; i++) {
      if (detailImageDoms[i].tagName === 'IMG') {
        detailImages.push(detailImageDoms[i]?.src)
      }
    }
    console.log('detail images: ', detailImages)

    const detailImageDoms2 = document.querySelectorAll('#detailContentContainer img')
    const detailImages2 = []
    for (let i = 0; i < detailImageDoms2.length; i++) {
      if (detailImageDoms2[i].tagName === 'IMG') {
        detailImages2.push(detailImageDoms2[i]?.src)
      }
    }
    console.log('detail images: ', detailImages2)

    console.log({
      detailImages,
      detailImages2,
      mainImages,
    })
  }

  const handleDownloadVideos = () => {}

  const getFactoryInfo = () => {
    const title = document.querySelector('#hd_0_container_0 div div div div div div span').title
    const year = document.querySelector('#hd_0_container_0 div div div div div div a div').innerText.replace('年', '')
    const scrollWidth = document
      .querySelector('#hd_0_container_0 div div div div div div div div div div')
      .style.width.replace('px', '')
    const scroll = scrollWidth / 62
    const address = document.querySelectorAll('#hd_0_container_0 div div div p span')[1].innerText.replace('地址：', '')
    const url = removeParamsFromPath(window.location.href, ['spm'])
    console.log({
      address,
      scroll: Number(scroll),
      title,
      url,
      year: Number(year),
    })
    setFactoryInfo({
      ...factoryInfo,
      address,
      scroll: Number(scroll),
      title,
      url,
      year: Number(year),
    })
  }

  const cleanDoms = () => {
    // detail-page
    document.querySelector('.od-pc-offer-toolbar-wrapper')?.remove()
    document.querySelector('.gyp-pc-od-middle-banner')?.remove()
    // 搭配组货
    document.querySelector('.od-pc-offer-combi-recommend')?.remove()

    // 同行还在看
    document.querySelector('.od-pc-offer-recommend')?.remove()
    // 声明内容
    document.querySelector('.od-pc-content-statement')?.remove()
    // 页脚
    document.querySelector('.od-pc-buyer-guarantee')?.remove()

    // https://cart.1688.com/cart.htm
    // 推荐货源模块
    document.querySelector('.ctf-lib-recommend')?.parentElement?.remove()
  }

  useEffect(() => {
    getFactoryInfo()
    cleanDoms()
    return () => {
      // clean
    }
  }, [getFactoryInfo])

  useEffect(() => {
    const port = browser.runtime.connect()

    port.onMessage.addListener((message) => {
      console.log('on message: ', message)
      const li = document.createElement('li')
      li.textContent = JSON.stringify(message)
      longLivedMessageList.current?.append(li)
    })
  }, [])

  return (
    <div
      className="w-[300px] fixed right-[10px] bottom-[10px] z-[101] border rounded-[10px]"
      style={{
        background: 'rgba(255,255,255, 0.8)',
      }}
    >
      <div>
        <div>{factoryInfo.title}</div>
        <div>{factoryInfo.year}</div>
        <div>{factoryInfo.scroll}</div>
        <div>{factoryInfo.address}</div>
      </div>
      <div>
        <div onClick={handleCollectFactoryInfo}>采集商家信息</div>
        <div onClick={handleCollectImages}>采集商品图片</div>
        <div onClick={handleDownloadVideos}>下载商品视频</div>
        <div>设置</div>
      </div>

      <div>
        <div>
          <h2>One-time Message</h2>
          <button className="text-right" onClick={sendHelloMessageBtn}>
            Send Hello Message
          </button>
          <pre>{helloResponsePre}</pre>
          <button className="text-right" onClick={sendUnknownMessageBtn}>
            Send Unknown Message
          </button>
          <pre>{unknownResponsePre}</pre>
        </div>
        <div>
          <h2>Long-lived Messages</h2>
          <ul id="longLivedMessageList" ref={longLivedMessageList}></ul>
        </div>
      </div>
    </div>
  )
}

export default App
