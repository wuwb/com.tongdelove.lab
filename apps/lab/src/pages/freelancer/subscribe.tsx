import { Container } from '@/components/common'
import { Link } from '@/components/ui/'
import { IconHelpHexagon } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'

const HomePage = props => {
  const setFormOptions = {}
  const { register, handleSubmit } = useForm(setFormOptions)

  const onSubmit = async data => {
    /**
    // 弹出扫码登录，登录成功，
        // 可以切换用账号密码登录
    // 判断是否注册，已经注册，查询订阅信息，后返回
        // 没有注册，弹出绑定已有账号，或者创建新的账号
            // 绑定已经账号，直接放回
            // 创建新的账号，直接返回，
    */
  }

  const handleTest = async data => {}

  const sourceList = [
    {
      id: 'upwork',
      name: 'Upwork（www.upwork.com）',
    },
    {
      id: 'shixian',
      name: '实现（shixian.com）',
    },
    {
      id: 'mayigeek',
      name: '码易（www.mayigeek.com）',
    },
    {
      id: 'a5',
      name: 'A5任务（www.a5.cn）',
    },
    {
      id: 'rrkf',
      name: '人人开发（rrkf.com）',
    },
    {
      id: 'taskcity',
      name: '智城外包网（www.taskcity.com）',
    },
    {
      id: 'oschina',
      name: '开源众包（zb.oschina.net）',
    },
    {
      id: 'codemart',
      name: '码市（codemart.com）',
    },
    {
      id: 'yuanjisong',
      name: '猿急送（www.yuanjisong.com）',
    },
  ]

  return (
    <Container className="text-gray-800">
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-4 p-10">
          <h3>订阅通知</h3>
          <div className="bg-white p-5">
            <form>
              <div className="mb-8 space-y-4">
                {sourceList.map(item => (
                  <div key={item.id} className="">
                    <label key={item.id} className="form-check-label">
                      <input type="checkbox" name="source" {...register('source')} id="source" value={item.id} className="form-check-input" />
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <div className="mb-2 flex space-x-4">
                  <span className="inline-block w-40">钉钉群机器人</span>
                  <div>
                    <label htmlFor="outlined-basic2">webhook</label>
                    <input id="outlined-basic2" type="text" placeholder="群机器人的 webhook 地址" className="w-72 p-2" {...register('dingdingWebhook.webhook')} />
                  </div>
                  <div>
                    <label htmlFor="outlined-basic2">key</label>
                    <input id="outlined-basic2" type="text" className="w-40 p-2" placeholder="请填写签名校验的密钥串" {...register('dingdingWebhook.secret')} />
                  </div>
                  <Link href="https://open.dingtalk.com/document/group/custom-robot-access">
                    <IconHelpHexagon />
                  </Link>
                </div>
                <div className="mb-2 flex space-x-4">
                  <span className="inline-block w-40">飞书群机器人</span>
                  <div>
                    <label htmlFor="outlined-basic2">通知地址</label>
                    <input id="outlined-basic2" type="text" placeholder="群机器人的 webhook 地址" className="w-72 p-2" {...register('feishuWebhook.webhook')} />
                  </div>
                  <div>
                    <label htmlFor="outlined-basic2">签名密钥</label>
                    <input id="outlined-basic2" type="text" placeholder="请填写签名校验的密钥串" className="w-72 p-2" {...register('feishuWebhook.secret')} />
                  </div>
                  <Link href="https://www.feishu.cn/hc/zh-CN/articles/360024984973">
                    <IconHelpHexagon />
                  </Link>
                </div>
                <div className="mb-2 flex space-x-4">
                  <span className="inline-block w-40">企业微信群机器人</span>
                  <div>
                    <label htmlFor="outlined-basic2">通知地址</label>
                    <input id="outlined-basic2" type="text" placeholder="群机器人的 webhook 地址" className="w-72 p-2" {...register('wechatWebhook.webhook')} />
                  </div>
                </div>
              </div>
              <div>
                <button className="inline-block cursor-pointer border" onClick={handleSubmit(onSubmit)}>
                  订阅通知
                </button>
                <button className="ml-2 inline-block cursor-pointer border" onClick={handleSubmit(handleTest)}>
                  测试一下
                </button>
              </div>
            </form>
            <div className="mt-10">如果嫌配置机器人麻烦，可以加我的微信 wuxx2024，我拉你们到订阅群里，加我的时候备注"订阅任务"。</div>
          </div>
        </div>
        <div className="">sidebar</div>
      </div>
    </Container>
  )
}

export default HomePage

export const getServerSideProps = async context => {
  //     try {
  //         // 获取账号对应的订阅状态
  //     } catch (error) {
  //         console.error(error);
  //         return {
  //             props: {
  //                 data: 0,
  //             },
  //         };
  //     }
  return {
    props: {},
  }
}
