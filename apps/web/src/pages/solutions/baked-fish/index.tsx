import { Button } from '@/components/ui/button'
import { toaster } from '@/components/ui/toaster'

import {
  AiOutlineExclamationCircle,
  AiOutlineCheckCircle,
} from 'react-icons/ai'
import { Layout } from '@/components/common'

const SolutionsBackedFishPage = () => {
  const info = () => {
    toaster.create({
      description: (
        <>
          请加微信 <span style={{ color: '#1890ff' }}>highwaypack</span>{' '}
          详细沟通。
        </>
      ),
      type: 'info',
    })
  }

  return (
    <div className="solutions-backed-fish">
      <div className="">
        <h1 className="pt-20 text-center">烤鱼自热包装</h1>
        <div className="flex justify-center gap-2.5">
          <span>3斤烤鱼自热餐盒</span>
          <span>外盒尺寸：41*27*11</span>
          <span>内盒尺寸：36*25*5</span>
        </div>
        <div className="flex scale-90 justify-center gap-2 md:scale-100 lg:gap-10">
          <div className="w-30 text-right">
            <div className="font p-2 text-xl">类型</div>
            <div className="p-2">磨具数量</div>
            <div className="p-2">磨具费</div>
            <div className="p-2">起订量</div>
            <div className="p-2">返还磨具费</div>
            <div className="p-2">现货价格</div>
            <ul className="p-2">
              <li>优点</li>
              <li>缺点</li>
            </ul>
          </div>
          <div className="w-40 rounded bg-gray-100 text-center shadow">
            <div className="p-2 text-xl font-extrabold">注塑包装</div>
            <div className="p-2">4</div>
            <div className="p-2">待定</div>
            <div className="p-2">50000个</div>
            <div className="p-2">待定</div>
            <div className="p-2">待定</div>
            <ul className="p-2 text-left">
              <li className="flex items-center">
                <AiOutlineCheckCircle
                  style={{ color: 'red', marginRight: '5px' }}
                />
                高档
              </li>
              <li className="flex items-center">
                <AiOutlineExclamationCircle style={{ marginRight: '5px' }} />脆
              </li>
              <li className="flex items-center">
                <AiOutlineExclamationCircle style={{ marginRight: '5px' }} />
                盒子上有注塑点
              </li>
            </ul>
          </div>
          <div className="w-40 rounded bg-gray-100 text-center shadow">
            <div className="p-2 text-xl font-extrabold">打杯包装</div>
            <div className="p-2">4</div>
            <div className="p-2">180000元</div>
            <div className="p-2">50000个</div>
            <div className="p-2">120万</div>
            <div className="p-2">9元</div>
            <ul className="p-2 text-left">
              <li className="flex items-center">
                <AiOutlineCheckCircle
                  style={{ color: 'red', marginRight: '5px' }}
                />
                质量好
              </li>
              <li className="flex items-center">
                <AiOutlineCheckCircle
                  style={{ color: 'red', marginRight: '5px' }}
                />
                高档
              </li>
              <li className="flex items-center">
                <AiOutlineExclamationCircle style={{ marginRight: '5px' }} />贵
              </li>
            </ul>
          </div>
          <div className="w-40 rounded bg-gray-100 text-center shadow lg:scale-110">
            <div className="-mt-10 h-10 w-full bg-gray-600 px-2 text-left leading-10 text-white">
              推荐
            </div>
            <div className="p-2 text-xl font-extrabold">吸塑包装</div>
            <div className="p-2">4</div>
            <div className="p-2">38000元</div>
            <div className="p-2">20000个</div>
            <div className="p-2">60万</div>
            <div className="p-2">9.3元</div>
            <ul className="p-2 text-left">
              <li className="flex items-center">
                <AiOutlineCheckCircle
                  style={{ color: 'red', marginRight: '5px' }}
                />
                便宜
              </li>
              <li className="flex items-center">
                <AiOutlineExclamationCircle style={{ marginRight: '5px' }} />
                中档
              </li>
            </ul>
          </div>
          <div className="w-40 rounded bg-gray-100 text-center shadow">
            <div className="p-2 text-xl font-extrabold">创新混合包装</div>
            <div className="p-2">3</div>
            <div className="p-2">30000元</div>
            <div className="p-2">10000个</div>
            <div className="p-2">58万</div>
            <div className="p-2">8元</div>
            <ul className="p-2 text-left">
              <li className="flex items-center">
                <AiOutlineCheckCircle
                  style={{ color: 'red', marginRight: '5px' }}
                />
                便宜
              </li>
              <li className="flex items-center">
                <AiOutlineCheckCircle
                  style={{ color: 'red', marginRight: '5px' }}
                />
                印刷美观
              </li>
              <li className="flex items-center">
                <AiOutlineExclamationCircle style={{ marginRight: '5px' }} />
                稳定性差
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center p-20">
          <Button type="primary" className="center" onClick={info}>
            马上沟通
          </Button>
        </div>
      </div>
    </div>
  )
}

SolutionsBackedFishPage.Layout = Layout

export default SolutionsBackedFishPage
