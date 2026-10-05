'use client'

import { Select } from '@tongdelove/ui/components/select'
import { Slider } from '@tongdelove/ui/components/slider'
import { Button } from '@tongdelove/ui/components/button'
import { Input } from '@tongdelove/ui/components/input'

import { useEffect, useMemo, useRef, useState } from 'react'
import { convertPathData } from '@/utils/svg'
import { Seal } from '@pansy/seal'

export default function SealGen(props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const innerCircleRef = useRef<SVGCircleElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<Seal | null>(null)

  const initialValues = {
    title: '合同印章',
    titleFont: 'Arial',
    titleFontSize: 20,
    titleFontWeight: 'bold',
    titleWordSpacing: 0,
    sealTitle: '合同印章',
    sealTitleFont: 'Arial',
    sealTitleFontSize: 100,
    sealTitleFontWeight: 'bold',
    sealTitleHorizontal: 0,
    sealTitleVertical: 0,
    centerContent: '🌟',
    centerContentFont: 'Arial',
    centerContentFontSize: 100,
    centerContentFontWeight: 'bold',
    centerContentWordSpacing: 0,
    securityCode: '12214324',
    securityCodeFont: 'Arial',
    securityCodeFontSize: 100,
    securityCodeFontWeight: 'bold',
    securityCodeWordSpacing: 0,
    outerBorderThickness: 5,
    innerBorderThickness: 5,
    showInnerBorder: true,
    color: '#FF0000',
    size: 400,
    aging: 0,
    showAging: false,
  }

  const [formValue, setFormValue] = useState(initialValues)

  const useForm = () => {
    return null
  }

  const form = useForm({
    mode: 'uncontrolled',
    initialValues,
    validate: {},
    onValuesChange: (values, previous) => {
      const formValue = form.getValues()
      setFormValue(formValue)
      sealRef.current?.update({
        ...formValue,
        width: formValue.size, //	指定印章的宽度	number	300
        height: formValue.size, //	指定印章的高度	number	300
      })
    },
  })

  const handleDownloadSeal = () => {
    // Logic to generate and download the seal
  }

  const dPath = useMemo(() => {
    if (innerCircleRef.current) {
      return convertPathData(innerCircleRef.current)
    }
  }, [formValue])

  useEffect(() => {
    if (!canvasContainerRef.current) {
      return
    }
    if (!sealRef.current) {
      sealRef.current = new Seal(canvasContainerRef.current, {
        // ...formValue,
        type: 'company', //	印章类型，分为公司印章、个人印章	company | personal	company
        shape: 'circle', //	指定印章的形状，仅公司印章有效	circle | square| ellipse	circle
        color: '#FF0000', //	印章颜色，各分部的颜色可单独指定	string	red
        showTransparent: true, //	是否显示透明背景, 下载时请隐藏	boolean	true
        width: formValue.size, //	指定印章的宽度	number	300
        height: formValue.size, //	指定印章的高度	number	300
        fiveStar: {
          visible: true,
          color: '#FF0000',
          size: 100,
        }, //	五角星配置
        text: {
          /** 是否显示 */
          visible: true,
          /** 文本颜色，默认取 options.color */
          color: '#FF0000',
          /** 字体大小 */
          fontSize: 20,
          /** 字体粗细 */
          fontWeight: '700',
          /** 文案 */
          text: '合同印章',
          /** 距离中心点的距离 */
          distance: 20,
          /** 环绕文案半径，具中心点的距离 */
          radius: 20,
          /** 绘制开始的角度 */
          startDegree: 20,
        }, //	主文字配置
        subText: {}, //	副文字配置
        centerText: {}, //	中心文字配置
        border: {}, //	边线配置
        innerBorder: {}, //	内边线配置
        innerLoopLine: {},
      })
    } else {
      sealRef.current.update({ ...formValue })
    }

    // 销毁印章
    return () => {
      sealRef.current?.destroy()
    }
  }, [formValue])

  const handleResetSeal = () => {
    sealRef.current?.destroy()

    // sealRef.current = sealRef.current = new Seal(canvasContainerRef.current, {
    //   // ...formValue,
    //   type: 'company', //	印章类型，分为公司印章、个人印章	company | personal	company
    //   shape: 'circle', //	指定印章的形状，仅公司印章有效	circle | square| ellipse	circle
    //   color: '#FF0000', //	印章颜色，各分部的颜色可单独指定	string	red
    //   showTransparent: true, //	是否显示透明背景, 下载时请隐藏	boolean	true
    //   width: formValue.size, //	指定印章的宽度	number	300
    //   height: formValue.size, //	指定印章的高度	number	300
    //   fiveStar: {
    //     visible: true,
    //     color: '#FF0000',
    //     size: 100,
    //   }, //	五角星配置
    //   text: {
    //      /** 是否显示 */
    //     visible: true,
    //     /** 文本颜色，默认取 options.color */
    //     color: '#FF0000',
    //     /** 字体大小 */
    //     fontSize: 20,
    //     /** 字体粗细 */
    //     fontWeight: '700',
    //     /** 文案 */
    //     text: '合同印章',
    //     /** 距离中心点的距离 */
    //     distance: 20,
    //     /** 环绕文案半径，具中心点的距离 */
    //     radius: 20,
    //     /** 绘制开始的角度 */
    //     startDegree: 20,
    //   }, //	主文字配置
    //   subText: {

    //   }, //	副文字配置
    //   centerText: {

    //   }, //	中心文字配置
    //   border: {

    //   }, //	边线配置
    //   innerBorder: {

    //   }, //	内边线配置
    //   innerLoopLine: {

    //   },
    // });
  }

  return (
    <div className="container">
      <h1>合同印章定制工具</h1>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 sm:p-5">
          <form
            onSubmit={form.onSubmit(handleDownloadSeal)}
            className="flex flex-col gap-4"
          >
            <div className="border p-2.5">
              <Input label="标题" {...form.getInputProps('title')} />

              <Select
                label="标题字体"
                data={['Arial', 'Times New Roman', 'Courier New', 'Georgia']}
                {...form.getInputProps('titleFont')}
              />
              <Slider
                label="标题字体大小"
                min={10}
                max={200}
                {...form.getInputProps('titleFontSize')}
              />
              <Select
                label="标题字体粗细"
                data={['normal', 'bold', 'bolder', 'lighter']}
                {...form.getInputProps('titleFontWeight')}
              />
              <Slider
                label="标题字间距"
                min={0}
                max={20}
                {...form.getInputProps('titleWordSpacing')}
              />
            </div>
            <div className="border p-2.5">
              <Input
                label="印章标题"
                {...form.getInputProps('sealTitle')}
              />
              <Select
                label="印章标题字体"
                data={['Arial', 'Times New Roman', 'Courier New', 'Georgia']}
                {...form.getInputProps('sealTitleFont')}
              />
              <Slider
                label="印章标题字体大小"
                min={10}
                max={200}
                {...form.getInputProps('sealTitleFontSize')}
              />
              <Select
                label="印章标题字体粗细"
                data={['normal', 'bold', 'bolder', 'lighter']}
                {...form.getInputProps('sealTitleFontWeight')}
              />
              <Slider
                label="印章标题水平位置"
                min={-100}
                max={100}
                {...form.getInputProps('sealTitleHorizontal')}
              />
              <Slider
                label="印章标题垂直位置"
                min={-100}
                max={100}
                {...form.getInputProps('sealTitleVertical')}
              />
            </div>
            <div className="border p-2.5">
              <Input
                label="中心内容"
                {...form.getInputProps('centerContent')}
              />
              <Select
                label="中心内容字体"
                data={['Arial', 'Times New Roman', 'Courier New', 'Georgia']}
                {...form.getInputProps('centerContentFont')}
              />
              <Slider
                label="中心内容字体大小"
                min={10}
                max={200}
                {...form.getInputProps('centerContentFontSize')}
              />
              <Select
                label="中心内容字体粗细"
                data={['normal', 'bold', 'bolder', 'lighter']}
                {...form.getInputProps('centerContentFontWeight')}
              />
              <Slider
                label="中心内容字间距"
                min={0}
                max={20}
                {...form.getInputProps('centerContentWordSpacing')}
              />
            </div>
            <div className="border p-2.5">
              <Input
                label="安全码"
                {...form.getInputProps('securityCode')}
              />
              <Select
                label="安全码字体"
                data={['Arial', 'Times New Roman', 'Courier New', 'Georgia']}
                {...form.getInputProps('securityCodeFont')}
              />
              <Slider
                label="安全码字体大小"
                min={10}
                max={200}
                {...form.getInputProps('securityCodeFontSize')}
              />
              <Select
                label="安全码字体粗细"
                data={['normal', 'bold', 'bolder', 'lighter']}
                {...form.getInputProps('securityCodeFontWeight')}
              />
              <Slider
                label="安全码字间距"
                min={0}
                max={20}
                {...form.getInputProps('securityCodeWordSpacing')}
              />
            </div>
            <div className="border p-2.5">
              <Slider
                label="印章大小"
                min={1}
                max={1024}
                {...form.getInputProps('size')}
              />

              <Input label="印章颜色" {...form.getInputProps('color')} />

              <Slider
                label="外边框厚度"
                min={1}
                max={20}
                {...form.getInputProps('outerBorderThickness')}
              />

              <Slider
                label="内边框厚度"
                min={1}
                max={20}
                {...form.getInputProps('innerBorderThickness')}
              />

              <Input
                label="显示内边框"
                {...form.getInputProps('showInnerBorder', { type: 'Input' })}
              />
            </div>
            <div className="border p-2.5">
              <Slider
                label="老化效果"
                min={0}
                max={100}
                {...form.getInputProps('aging')}
              />

              <Input
                label="显示老化效果"
                {...form.getInputProps('showAging', { type: 'Input' })}
              />
            </div>
          </form>
          <Button onClick={handleResetSeal}>重新生成</Button>
        </div>
        <div className="w-full sm:w-1/2 sm:p-5">
          {/* <svg
                ref={svgRef}
                viewBox={`0 0 ${formValue.size} ${formValue.size}`}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
              >
                <circle
                  cx={formValue.size / 2}
                  cy={formValue.size / 2}
                  r={(formValue.size / 2) - formValue.outerBorderThickness}
                  fill="none"
                  stroke={formValue.color}
                  strokeWidth={formValue.outerBorderThickness}
                />
                <circle
                  cx={formValue.size / 2}
                  cy={formValue.size / 2}
                  r={(formValue.size / 2) - formValue.outerBorderThickness - formValue.innerBorderThickness}
                  stroke={formValue.color}
                  fill="none"
                  ref={innerCircleRef}
                />
                <g id="RangText1" layer="1" fontSize="18" fontStyle="normal" fontFamily="Arial" fill="#2f69c2" stroke="none" fontWeight="normal" in="0" rad="104" cut="-38" len="122">

                  {
                    Array.from(formValue.title).map((char, index) => {
                      const x = 72.05 + index * 20
                      const y = 57.23
                      const z = -31.99
                      return (
                        <text transform={`translate(${x},${y}) rotate(${z})`} key={index}>
                          <tspan>{char}</tspan>
                        </text>
                      )
                    })
                  }

                  <text transform="translate(72.05,57.23) rotate(-31.99)"><tspan>圆</tspan></text>
                  <text transform="translate(93.14,45.12) rotate(-15.74)"><tspan>形</tspan></text>
                  <text transform="translate(116.76,39.40) rotate(0.51)"><tspan>周</tspan></text>
                  <text transform="translate(141.05,40.51) rotate(16.77)"><tspan>围</tspan></text>
                  <text transform="translate(164.06,48.38) rotate(33.02)"><tspan>的</tspan></text>
                  <text transform="translate(183.94,62.37) rotate(49.27)"><tspan>文</tspan></text>
                  <text transform="translate(199.11,81.37) rotate(65.52)"><tspan>字</tspan></text>
                  <text transform="translate(208.36,103.85) rotate(77.77)"><tspan> </tspan></text>
                </g>
              </svg> */}

          {/* <canvas 
                ref={canvasRef} 
                width={formValue.size}
                height={formValue.size}
                // style={{ display: 'none' }}
              ></canvas> */}

          <div ref={canvasContainerRef}></div>
        </div>
      </div>
    </div>
  )
}
