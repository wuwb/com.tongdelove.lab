import { Space } from 'antd';
import styled from '@emotion/styled';

const Home = () => {
  const customers = [
    '博通包装',
    '皓康食品',
    '灰太狼食品',
    '虹府食品',
    '巴格万火锅',
    '思纪源食品',
    '麦相坊食品',
    '山咔咔食品',
    '宿美文化',
    '好小儿蚊香',
    'Confo',
    'TSUNAMI',
    '圣奥莱克',
    '唯滋美食品',
    '柏之味食品',
    '嗨一虾',
    '嗨鲜生',
    '钢管厂五区',
    '侗家食府',
    '祖哈里食品',
    '欣盒食品',
    '孙家粽',
    '桂鹏食品',
    '爱嗨食光',
    '豫缘食品',
    '木槿宫食品',
    '欣欣食品',
    '9酒久虾',
    '川十三食品',
    '董记食品',
    '蛙噻食品',
    '佳一食品',
    '少清众味',
    '捧起食品',
    '食来运转',
    '特别特餐饮',
    '志愿食品',
    '大一潘拉面',
    '班花串串香',
    '麻辣串奇',    
    '1号鲜',
    '背锅侠火锅',
    '燚火锅',
    '虎虎清伊斯坊',
    '小媳妇米线',
    '稻芙蓉米粉',
    '伊小乐食品',
    '知稻手工粉',
    '骁辣火锅',
    '饭茶垟餐饮',
    '熊阪食品',
    '永达科技',
    '我来辣火锅',
    '万家福食品',
    '贵知乡源食品',
    '蓝璞酒店',
    '桐记火锅',
    '荣膳荷羊肉粉',
    '食途食品',
    '大汉王朝火锅',
    '泉竹拉面',
    '王家爸爸火锅',
    '章鱼小哥火锅',
    '怪噜羊肉粉',
    '馋了侬食品',
    '山呷呷食品',
    '趣商互动'
  ]

  const overseaCustomers = [
    'Mama Vege',
    'Serveat',
    'Cramer',
  ]

  function makeGridDom (data) {
    return data.map((item => {
      return <div className="border px-4 py-2 cursor-pointer text-center hover:text-white hover:bg-black" key={item}>{item}</div>
    }));
  }

  const customersDom = makeGridDom(customers) 
  const overseaCustomersDom = makeGridDom(overseaCustomers) 

  return (
    <div className="text-center max-w-2xl lg:max-w-7xl my-10 mx-auto">
      <div className="client-block-hd">
        <h3 className="text-lg">
          深受客户信赖
        </h3>
        <p className="text-base">
          无数的客户坚定的选择了我们
        </p>
      </div>
      <Space wrap className="max-w-2xl lg:max-w-7xl justify-center">
        {customersDom}
      </Space>

      <h4 className="text-base mt-5">海外客户</h4>
      <Space wrap className="max-w-2xl lg:max-w-7xl justify-center">
        {overseaCustomersDom}
      </Space>
    </div>
  );
};

export default Home;
