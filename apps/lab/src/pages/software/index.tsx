import React, { useState, useEffect } from 'react'
import { useTranslation } from '@/i18n'
import { SoftwareItem } from '@/components/Objects/Software/SoftwareItem'

function Software() {
  const { t } = useTranslation()
  const softwareList = [
    {
      id: 1,
      name: '软件A',
      description: '这是一个非常有用的软件A，提供了多种功能。',
      icon: 'https://example.com/icon-a.png',
      detailUrl: '/software/a',
    },
    {
      id: 2,
      name: '软件B',
      description: '这是另一个优秀的软件B，适合各种场景。',
      icon: 'https://example.com/icon-b.png',
      detailUrl: '/software/b',
    },
  ]

  const [softwares, setSoftwares] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const softwarePerPage = 8 // 4个一行，一次加载两行

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return

      setLoading(true)
      // 假设你有一个API可以获取软件列表，这里只是一个模拟的示例
      // const response = await fetch(`https://api.example.com/softwares?page=${page}&per_page=${softwarePerPage}`);
      // const data = await response.json();

      setSoftwares((prevSoftwares) => [...softwareList])
      setLoading(false)
    }

    window.addEventListener('scroll', () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1)
      }
    })

    fetchData()
  }, [loading, page])

  return (
    <>
      <div className="grow">
        <div>
          {softwares.map((software, index) => (
            <SoftwareItem key={index} software={software} />
          ))}
        </div>
      </div>
      <div className="w-[40%]">
        <div>
          <div>论坛 https://github.com/flarum/flarum/</div>
          <div>网盘 https://github.com/Xhofe/alist</div>
        </div>
        <div>
          <h1>Recommand Software</h1>
          <h3>系统工具</h3>
          <h3>办公软件</h3>
          <h3>图像处理</h3>
          <h3>视频编辑</h3>
          <h3>编程工具</h3>
          <h3>下载工具</h3>
          <h3>压缩工具</h3>
          <h3>截图录音</h3>
          <h3>链接工具</h3>
          <h3>媒体工具</h3>
        </div>
        <div className="box mx-auto max-w-screen-lg p-2">
          {t('Tuxera Disk Manager ZeroTier')}
        </div>
      </div>
    </>
  )
}

export default Software
