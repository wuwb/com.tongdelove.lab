import React, { useState, useRef, useEffect } from 'react'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { Button } from '@/components/ui/button'
import { Layout } from '@/components/common/Layout'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@tongdelove/ui/components/tabs'
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
  AccordionRoot,
} from '@/components/ui/accordion'

const Home = () => {
  const data = [
    '4cm x 4cm x 2cm',
    '6cm x 6cm x 2cm',
    '7cm x 6cm x 1cm',
    '8cm x 5cm x 3cm',
    '9cm x 6cm x 4cm',
    '9cm x 8cm x 2cm',
    '10cm x 8cm x 4cm',
    '10cm x 9cm x 1.5cm',
    '12cm x 9cm x 2cm',
    '13cm x 10cm x 5cm',
    '14cm x 10cm x 4cm',
  ]
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  }
  function callback(key) {
    console.log(key)
  }

  const [material, setMaterial] = useState()

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setMaterial(e.target.value)
  }

  const canvasRef = useRef(null)
  const colorCanvasRef = useRef(null)
  const [x, setX] = useState(100)
  const [y, setY] = useState(100)
  const [z, setZ] = useState(100)
  const [n, setN] = useState(100)

  function changeX(e) {
    setX(e.target.value)
  }
  function changeY(e) {
    setY(e.target.value)
  }
  function changeZ(e) {
    setZ(e.target.value)
  }
  function changeN(e) {
    setN(e.target.value)
  }

  function shadeColor(color, percent) {
    const newColor = color.substr(1)
    var num = parseInt(newColor, 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  function drawCube(ctx, x, y, wx, wy, h, color) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x - wx, y - wx * 0.5)
    ctx.lineTo(x - wx, y - h - wx * 0.5)
    ctx.lineTo(x, y - h * 1)
    ctx.closePath()
    ctx.fillStyle = shadeColor(color, -10)
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + wy, y - wy * 0.5)
    ctx.lineTo(x + wy, y - h - wy * 0.5)
    ctx.lineTo(x, y - h * 1)
    ctx.closePath()
    ctx.fillStyle = shadeColor(color, 10)
    ctx.strokeStyle = shadeColor(color, 50)
    ctx.stroke()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(x, y - h)
    ctx.lineTo(x - wx, y - h - wx * 0.5)
    ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5))
    ctx.lineTo(x + wy, y - h - wy * 0.5)
    ctx.closePath()
    ctx.fillStyle = shadeColor(color, 20)
    ctx.strokeStyle = shadeColor(color, 60)
    ctx.stroke()
    ctx.fill()
  }

  function draw(canvas) {
    var ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    var wobble = (Math.sin(Date.now() / 250) * window.innerHeight) / 50

    drawCube(
      ctx,
      window.innerWidth / 2,
      window.innerHeight / 2 + wobble + z / 2,
      Number(x),
      Number(y),
      Number(z),
      '#ff8d4b'
    )
  }

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect()
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    }
  }

  function drawColorSquare(canvas, color, imageObj) {
    var colorSquareSize = 100
    var padding = 10
    var context = canvas.getContext('2d')
    var squareX = (canvas.width - colorSquareSize + imageObj.width) / 2
    var squareY = (canvas.height - colorSquareSize) / 2

    context.beginPath()
    context.fillStyle = color
    context.fillRect(squareX, squareY, colorSquareSize, colorSquareSize)
    context.strokeRect(squareX, squareY, colorSquareSize, colorSquareSize)
  }

  function drawColor(canvas, imageObj) {
    var padding = 10
    var context = canvas.getContext('2d')
    var mouseDown = false

    context.strokeStyle = '#444'
    context.lineWidth = 2

    canvas.addEventListener(
      'mousedown',
      function () {
        mouseDown = true
      },
      false
    )

    canvas.addEventListener(
      'mouseup',
      function () {
        mouseDown = false
      },
      false
    )

    canvas.addEventListener(
      'mousemove',
      function (evt) {
        var mousePos = getMousePos(canvas, evt)
        let newColor: string

        if (
          mouseDown &&
          mousePos !== null &&
          mousePos.x > padding &&
          mousePos.x < padding + imageObj.width &&
          mousePos.y > padding &&
          mousePos.y < padding + imageObj.height
        ) {
          // color picker image is 256x256 and is offset by 10px
          // from top and bottom
          var imageData = context.getImageData(
            padding,
            padding,
            imageObj.width,
            imageObj.width
          )
          var data = imageData.data
          var x = mousePos.x - padding
          var y = mousePos.y - padding
          var red = data[(imageObj.width * y + x) * 4]
          var green = data[(imageObj.width * y + x) * 4 + 1]
          var blue = data[(imageObj.width * y + x) * 4 + 2]
          newColor = 'rgb(' + red + ',' + green + ',' + blue + ')'
          drawColorSquare(canvas, newColor, imageObj)
        }
      },
      false
    )

    context.drawImage(imageObj, padding, padding)

    drawColorSquare(canvas, 'white', imageObj)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    draw(canvas)

    const colorCanvas = colorCanvasRef.current

    var imageObj = new Image()
    imageObj.onload = function () {
      drawColor(colorCanvas, imageObj)
    }
    imageObj.src = './assets/color-picker.png'
  }, [draw])

  return (
    <div className="p-10">
      <div className="grid">
        <div className="">
          <Tabs defaultValue="1">
            <TabsList>
              <TabsTrigger value="大小">大小</TabsTrigger>
              <TabsTrigger value="材质">材质</TabsTrigger>
              <TabsTrigger value="设计">设计</TabsTrigger>
              <TabsTrigger value="数量">数量</TabsTrigger>
            </TabsList>
            <TabsContent value="大小">
              <AccordionRoot type="single" defaultValue="1">
                <AccordionItem value="常用长宽高">
                  <AccordionTrigger>常用长宽高</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-inside list-disc space-y-1">
                      {data.map((item, index) => {
                        return <li key={item}>{item}</li>
                      })}
                    </ul>
                    <div className="mt-2">尺寸的单位是厘米</div>
                    <div>不清楚自己需要多大尺寸？可以联系我们。</div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="自定义长宽高">
                  <AccordionTrigger>自定义长宽高</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span>长</span>
                        <span>
                          <input type="text" value={x} onChange={changeX} />
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>宽</span>
                        <span>
                          <input type="text" value={y} onChange={changeY} />
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>高</span>
                        <span>
                          <input type="text" value={z} onChange={changeZ} />
                        </span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </AccordionRoot>
            </TabsContent>
            <TabsContent value="材质">
              <RadioGroup onChange={onChange} value={material}>
                <Radio style={radioStyle} value="1">
                  传统白板
                </Radio>
                <Radio style={radioStyle} value="2">
                  高级白板
                </Radio>
                <Radio style={radioStyle} value="2">
                  牛皮纸
                  <div>自然棕色卡纸上油</div>
                </Radio>
              </RadioGroup>
            </TabsContent>
            <TabsContent value="设计">
              <AccordionRoot type="single" defaultValue="1">
                <AccordionItem value="在线设计">
                  <AccordionTrigger>在线设计</AccordionTrigger>
                  <AccordionContent>
                    <div className="{Style['selectors']}">
                      <div className="{Style['cover-selector']}">
                        <div>位置</div>
                        <div className="{Style.outer}">
                          <div className="{Style.scope}">外部</div>
                          <div className="{Style.types}">
                            <div>前面</div>
                            <div>后面</div>
                            <div>底部</div>
                            <div>顶部</div>
                            <div>左边</div>
                            <div>右边</div>
                          </div>
                        </div>
                        <div className="{Style.inner}">
                          <div className="{Style.scope}">内部</div>
                          <div className="{Style.types}">
                            <div>前面</div>
                            <div>后面</div>
                            <div>底部</div>
                            <div>顶部</div>
                            <div>左边</div>
                            <div>右边</div>
                          </div>
                        </div>
                      </div>
                      <div className="{Style['color-selctor']}">
                        <div>颜色</div>
                        <canvas
                          ref={colorCanvasRef}
                          width="1020"
                          height="1020"
                          style={{ width: '510px', height: '510px' }}
                        ></canvas>
                      </div>
                      <div className="">
                        <div>图片</div>
                      </div>
                      <div className="{Style['text-selector']}">
                        <div>文字</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="离线设计">
                  <AccordionTrigger>离线设计</AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <Button>下载设计模板</Button>
                      <Button>上传模板</Button>
                    </div>
                    <div>匹配包装设计专家</div>
                  </AccordionContent>
                </AccordionItem>
              </AccordionRoot>
            </TabsContent>
            <TabsContent value="数量">
              <div>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>选择数量</span>
                    <span>单价</span>
                  </li>
                  <li className="flex justify-between">
                    <span>&lg;=10,000</span>
                    <span>Request</span>
                  </li>
                  <li className="flex justify-between">
                    <span>=2,000</span>
                    <span>Request</span>
                  </li>
                  <li className="flex justify-between">
                    <span>2,000</span>
                    <span>1.29</span>
                  </li>
                  <li className="flex justify-between">
                    <span>1,000</span>
                    <span>1.41</span>
                  </li>
                  <li className="flex justify-between">
                    <span>自定义数量</span>
                    <span>
                      <input type="text" value={n} onChange={changeN} />
                    </span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <canvas
            ref={canvasRef}
            width="1020"
            height="1020"
            style={{ width: '510px', height: '510px' }}
          ></canvas>
        </div>
        <div className="{Style.AccordionItem}">
          <div className="{Style['panel-title']}">
            <h3>Mailer Box</h3>
            <p>描述信息</p>
          </div>
          <div className="{Style['panel-item']}">
            <span>大小</span>
            <span>
              长{x}宽{y}高{z}
            </span>
          </div>
          <div className="{Style['panel-item']}">
            <span>材质</span>
            <span>材质</span>
          </div>
          <div className="{Style['panel-item']}">
            <span>工艺</span>
            <span>材质</span>
          </div>
          <div className="{Style['panel-item']}">
            <span>数量</span>
            <span>{n}</span>
          </div>
          <div className="{Style['panel-item']}">
            <span>单价</span>
            <span>材质</span>
          </div>
          <div className="{Style['panel-item']}">
            <span>总价</span>
            <span>材质</span>
          </div>
          <div className="{Style['panel-submit']}">
            <Button>下单</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.Layout = Layout

export default Home
