import React, { useState, useRef, useEffect } from 'react'
import { Button, Tabs, List, Collapse, Radio } from 'antd'
import Layout from '@/components/common/Layout'
import s from './index.module.css'

const { TabPane } = Tabs
const { Panel } = Collapse

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
    color = color.substr(1)
    var num = parseInt(color, 16),
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
        var color = undefined

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
          var color: any = 'rgb(' + red + ',' + green + ',' + blue + ')'
          drawColorSquare(canvas, color, imageObj)
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
          <Tabs defaultActiveKey="1" tabPosition="left">
            <TabPane tab="大小" key="0">
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="常用长宽高" key="1">
                  <List
                    bordered
                    dataSource={data}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                  <div>尺寸的单位是厘米</div>
                  <div>不清楚自己需要多大尺寸？可以联系我们。</div>
                </Panel>
                <Panel header="自定义长宽高" key="2">
                  <List bordered>
                    <List.Item>
                      <span>长</span>
                      <span>
                        <input type="text" value={x} onChange={changeX} />
                      </span>
                    </List.Item>
                    <List.Item>
                      <span>宽</span>
                      <span>
                        <input type="text" value={y} onChange={changeY} />
                      </span>
                    </List.Item>
                    <List.Item>
                      <span>高</span>
                      <span>
                        <input type="text" value={z} onChange={changeZ} />
                      </span>
                    </List.Item>
                  </List>
                </Panel>
              </Collapse>
            </TabPane>
            <TabPane tab="材质" key="1">
              <Radio.Group onChange={onChange} value={material}>
                <Radio style={radioStyle} value={1}>
                  传统白板
                </Radio>
                <Radio style={radioStyle} value={2}>
                  高级白板
                </Radio>
                <Radio style={radioStyle} value={3}>
                  牛皮纸
                  <div>自然棕色卡纸上油</div>
                </Radio>
              </Radio.Group>
            </TabPane>
            <TabPane tab="设计" key="2">
              <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header="在线设计" key="1">
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
                </Panel>
                <Panel header="离线设计" key="2">
                  <div>
                    <Button>下载设计模板</Button>
                    <Button>上传模板</Button>
                  </div>
                  <div>匹配包装设计专家</div>
                </Panel>
              </Collapse>
            </TabPane>
            <TabPane tab="数量" key="3">
              <div>
                <List bordered>
                  <List.Item>
                    <span>选择数量</span>
                    <span>单价</span>
                  </List.Item>
                  <List.Item>
                    <span>&lg;=10,000</span>
                    <span>Request</span>
                  </List.Item>
                  <List.Item>
                    <span>=2,000</span>
                    <span>Request</span>
                  </List.Item>
                  <List.Item>
                    <span>2,000</span>
                    <span>1.29</span>
                  </List.Item>
                  <List.Item>
                    <span>1,000</span>
                    <span>1.41</span>
                  </List.Item>
                  <List.Item>
                    <span>自定义数量</span>
                    <span>
                      <input type="text" value={n} onChange={changeN} />
                    </span>
                  </List.Item>
                </List>
              </div>
            </TabPane>
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
        <div className="{Style.Panel}">
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
