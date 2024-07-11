import { Button, message, Space } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Layout } from '@/components/common';

const SolutionsBackedFishPage = () => {
  const info = () => {
    message.info(<>请加微信 <span style={{color: '#1890ff'}}>highwaypack</span> 详细沟通。</>, 30);
  };

  return (
    <div className="solutions-backed-fish">
      <div className="">
        <h1 className="pt-20 text-center">烤鱼自热包装</h1>
        <div className="flex justify-center">
        <Space className="pb-20 text-center" direction="vertical">
          <span>3斤烤鱼自热餐盒</span>
          <span>外盒尺寸：41*27*11</span>
          <span>内盒尺寸：36*25*5</span>
        </Space>
        </div>
        <div className="flex justify-center scale-90 md:scale-100 gap-2 lg:gap-10">
          <div className="w-30 text-right">
            <div className="p-2 font text-xl">类型</div>
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
          <div className="w-40 bg-gray-100 shadow rounded text-center">
            <div className="p-2 font-extrabold text-xl">注塑包装</div>
            <div className="p-2">4</div>
            <div className="p-2">待定</div>
            <div className="p-2">50000个</div>
            <div className="p-2">待定</div>
            <div className="p-2">待定</div>
            <ul className="p-2 text-left">
              <li className="flex items-center"><CheckCircleOutlined style={{ color: 'red', marginRight: '5px' }} />高档</li>
              <li className="flex items-center"><ExclamationCircleOutlined style={{ marginRight: '5px' }} />脆</li>
              <li className="flex items-center"><ExclamationCircleOutlined style={{ marginRight: '5px' }} />盒子上有注塑点</li>
            </ul>
          </div>
          <div className="w-40 bg-gray-100 shadow rounded text-center">
            <div className="p-2 font-extrabold text-xl">打杯包装</div>
            <div className="p-2">4</div>
            <div className="p-2">180000元</div>
            <div className="p-2">50000个</div>
            <div className="p-2">120万</div>
            <div className="p-2">9元</div>
            <ul className="p-2 text-left">
              <li className="flex items-center"><CheckCircleOutlined style={{ color: 'red', marginRight: '5px' }} />质量好</li>
              <li className="flex items-center"><CheckCircleOutlined style={{ color: 'red', marginRight: '5px' }} />高档</li>
              <li className="flex items-center"><ExclamationCircleOutlined style={{ marginRight: '5px' }} />贵</li>
            </ul>
          </div>
          <div className="w-40 bg-gray-100 shadow lg:scale-110 rounded text-center">
            <div className="h-10 leading-10 bg-gray-600 text-white w-full text-left px-2 -mt-10">推荐</div>
            <div className="p-2 font-extrabold text-xl">吸塑包装</div>
            <div className="p-2">4</div>
            <div className="p-2">38000元</div>
            <div className="p-2">20000个</div>
            <div className="p-2">60万</div>
            <div className="p-2">9.3元</div>
            <ul className="p-2 text-left">
              <li className="flex items-center"><CheckCircleOutlined style={{ color: 'red', marginRight: '5px' }} />便宜</li>
              <li className="flex items-center"><ExclamationCircleOutlined style={{ marginRight: '5px' }} />中档</li>
            </ul>
          </div>
          <div className="w-40 bg-gray-100 shadow rounded text-center">
            <div className="p-2 font-extrabold text-xl">创新混合包装</div>
            <div className="p-2">3</div>
            <div className="p-2">30000元</div>
            <div className="p-2">10000个</div>
            <div className="p-2">58万</div>
            <div className="p-2">8元</div>
            <ul className="p-2 text-left">
              <li className="flex items-center"><CheckCircleOutlined style={{ color: 'red', marginRight: '5px' }} />便宜</li>
              <li className="flex items-center"><CheckCircleOutlined style={{ color: 'red', marginRight: '5px' }} />印刷美观</li>
              <li className="flex items-center"><ExclamationCircleOutlined style={{ marginRight: '5px' }} />稳定性差</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center p-20">
          <Button type="primary" className="center" onClick={info}>马上沟通</Button>
        </div>
      </div>
    </div>
  );
};

SolutionsBackedFishPage.Layout = Layout;

export default SolutionsBackedFishPage;
