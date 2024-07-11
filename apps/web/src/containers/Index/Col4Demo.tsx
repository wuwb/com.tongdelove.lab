import Image from 'next/image';
import { Row, Col, Divider } from 'antd';
import cx from 'classnames';
import { ProductDemoList } from '@/components/module';

const UsgCate = (props) => {
  return (
    <>
    <ProductDemoList title="自加热餐盒" products={[
      {
        image: '/assets/index/1.jpg',
        title: '3号餐盒'
      },{
        image: '/assets/index/2.jpg',
        title: '7号餐盒'
      },{
        image: '/assets/index/3.jpg',
        title: 'CP01号餐盒'
      },{
        image: '/assets/index/4.jpg',
        title: '129号餐盒'
      },{
        image: '/assets/index/5.jpg',
        title: '123号餐盒'
      },{
        image: '/assets/index/6.jpg',
        title: '128号餐盒'
      }
    ]} />
    <ProductDemoList title="自加热餐盒点 - 全包纸套" products={[
      {
        image: '/assets/index/01.jpg',
        title: '3号餐盒'
      },{
        image: '/assets/index/02.jpg',
        title: '7号餐盒'
      },{
        image: '/assets/index/3.jpg',
        title: 'CP01号餐盒'
      },{
        image: '/assets/index/4.jpg',
        title: '129号餐盒'
      },{
        image: '/assets/index/5.jpg',
        title: '123号餐盒'
      },{
        image: '/assets/index/06.jpg',
        title: '128号餐盒'
      }
    ]} />
    </>
  );
};

export default UsgCate;
