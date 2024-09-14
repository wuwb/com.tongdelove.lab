import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Jimp } from 'jimp'
// import { Popularity, OctreeNode } from '@tongdelove/utils'
import { Popularity } from './Popularity'
import { OctreeNode } from './OctreeNode'
import { VisualOctree } from './VisualOctree'
import { ColorTiles } from './ColorTiles'
import { useTranslation } from '@/i18n'
import { Button, NativeSelect } from '@mantine/core'

let tc: OctreeNode
let popu: Popularity
enum algorithm {
  octree,
  popularity,
}

export const ColorExtractionPage = () => {
  const { t } = useTranslation()
  const [scanFinished, setScanFinished] = useState<boolean | null>(null)
  const [alg, setAlg] = useState(0)
  const [themeLevel, setThemeLevel] = useState(2)
  const [img, setImg] = useState(null)
  const [themeColors, setThemeColors] = useState([])
  const fileSrc = useRef(null)

  const scan = useCallback(async () => {
    if (!img) {
      return
    }
    console.log('start-------------------------')
    setScanFinished(false)

    console.log('URL.createObjectURL(img): ', URL.createObjectURL(img))
    const newImg = await Jimp.read(URL.createObjectURL(img))

    console.log('img:', newImg)

    switch (alg) {
      case algorithm.octree: {
        tc = new OctreeNode('', -1)
        break
      }
      case algorithm.popularity: {
        popu = new Popularity(themeLevel)
        break
      }
    }

    console.time('scaling')
    newImg
      .scaleToFit({
        h: 100,
        w: 100,
      })
      .scan(
        0,
        0,
        newImg.bitmap.width,
        newImg.bitmap.height,
        function (x, y, idx) {
          const red = this.bitmap.data[idx + 0]
          const green = this.bitmap.data[idx + 1]
          const blue = this.bitmap.data[idx + 2]
          switch (alg) {
            case algorithm.octree: {
              tc.addColor([red, green, blue])
              break
            }
            case algorithm.popularity: {
              popu.addColor([red, green, blue])
              break
            }
          }
          if (x == 0 && y == 0) {
            // image scan started
            console.timeEnd('scaling')
            console.time('scanning')
          }
          if (x == newImg.bitmap.width - 1 && y == newImg.bitmap.height - 1) {
            // image scan finished
            console.timeEnd('scanning')
            setScanFinished(true)
          }
        }
      )
  }, [img, themeLevel, alg])

  const handleFileInput = useCallback(() => {
    const fileList = fileSrc.current.files
    if (fileList.length === 1) {
      setImg(fileList[0])
    }
  }, [])

  const changeLevel = useCallback((e) => {
    setThemeLevel(parseInt(e.currentTarget.value))
  }, [])

  const getThemeColors = useCallback(() => {
    console.log('getThemeColors scanFinished: ', scanFinished)
    if (!scanFinished) {
      return
    }
    switch (alg) {
      case algorithm.octree: {
        console.time('reducing')
        tc.reduce(themeLevel)
        // VisualOctree(tc)
        console.timeEnd('reducing')
        console.log('leaf', tc.leafNum, 'live leaf', tc.liveLeafNum)
        // VisualOctree(tc)
        console.time('get themeColors')
        const result = tc.themeColors
        console.timeEnd('get themeColors')
        setThemeColors(result)
        break
      }
      case algorithm.popularity: {
        console.time('get themeColors')
        setThemeColors(popu.themeColors)
        console.timeEnd('get themeColors')
        break
      }
    }
  }, [scanFinished, themeLevel, alg])

  const handleSelection = useCallback((e) => {
    setAlg(parseInt(e.currentTarget.value))
  }, [])

  const handleClickScan = () => {
    scan()
  }

  return (
    <div className="flex">
      <div className="flex flex-col">
        <label className="file">
          <input onChange={handleFileInput} ref={fileSrc} type="file"></input>
        </label>

        <NativeSelect
          label={t('算法')}
          value={alg}
          onChange={handleSelection}
          data={[
            { label: 'Octree', value: '0' },
            { label: 'Popularity', value: '1' },
          ]}
        />

        <label className="level">
          主题色细粒度: {themeLevel}
          <input
            value={themeLevel}
            onChange={changeLevel}
            type="range"
            min="0"
            max="6"
            step="1"
          ></input>
        </label>
        {scanFinished ? t('扫描完成') : t('扫描中')}

        <Button onClick={handleClickScan}>{t('扫描')}</Button>
        <Button onClick={getThemeColors}>{t('获取分色')}</Button>
      </div>
      <div>
        <div className="h-[200px] w-[200px]">
          <img
            className="preview"
            src={img ? URL.createObjectURL(img) : ''}
          ></img>
        </div>
        <div className="">
          <ColorTiles themeColors={themeColors} />
        </div>
      </div>
    </div>
  )
}
