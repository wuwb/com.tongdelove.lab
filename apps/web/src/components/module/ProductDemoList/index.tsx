import Image from 'next/image';
import Link from 'next/link';
import { Row, Col, Divider } from 'antd';
import cx from 'classnames';
import s from './ProductDemoList.module.css';

const ProductDemoList = (props) => {
  return (
    <div className={cx(s.col4demo, '2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-lg mx-auto')}>
      <div className="text-2xl font-heading px-2 py-4">{props.title}</div>
      <div className="justify-center flex gap-2 flex-wrap">
        <div className={cx(s.productWrap)}>
          <div className="product">
            <Link href="">
            <a href="" className="action-hover">
              <Image
                className="w-10"
                width={240}
                height={240}
                src={props.products[0].image}
              />
            </a>
            </Link>
          </div>
          <div className="product-detail">
            <h4 className="box-title">
            <Link href="/products/corrugated-mailer-boxes">
              <a
                className="action-hover text-base text-center"
              >
                {props.products[0].title}
              </a>
              </Link>
            </h4>
          </div>
        </div>
        <div className={cx(s.productWrap)}>
          <div className="product">
          <Link href="">
            <a href="" className="action-hover">
              <Image
                width={240}
                height={240}
                src={props.products[1].image}
              />
            </a>
            </Link>
          </div>
          <div className="product-detail">
            <h4 className="box-title">
            <Link href="/products/corrugated-mailer-boxes">
              <a
                className="action-hover text-base text-center"
              >
                {props.products[1].title}
              </a>
              </Link>
            </h4>
            
          </div>
        </div>
        <div className={cx(s.productWrap)}>
          <div className="product">
          <Link href="">
            <a href="" className="action-hover">
              <Image
                width={240}
                height={240}
                src={props.products[2].image}
              />
            </a>
            </Link>
          </div>
          <div className="product-detail">
            <h4 className="box-title">
            <Link href="/products/corrugated-mailer-boxes">
              <a
                className="action-hover text-base text-center"
              >
                {props.products[2].title}
              </a>
              </Link>
            </h4>
          </div>
        </div>
        <div className={cx(s.productWrap)}>
          <div className="product">
          <Link href="">
            <a href="" className="action-hover">
              <Image
                width={240}
                height={240}
                src={props.products[3].image}
              />
              
            </a>
            </Link>
          </div>
          <div className="product-detail">
            <h4 className="box-title">
            <Link href="/products/corrugated-mailer-boxes">
              <a
                className="action-hover text-base text-center"
              >
                {props.products[3].title}
              </a>
              </Link>
            </h4>
          </div>
        </div>
        <div className={cx(s.productWrap, 'lg:hidden xl:block')}>
          <div className="product">
          <Link href="">
            <a href="" className="action-hover">
              <Image
                width={240}
                height={240}
                src={props.products[4].image}
              />
            </a>
            </Link>
          </div>
          <div className="product-detail">
            <h4 className="box-title">
            <Link href="/products/corrugated-mailer-boxes">
              <a
                className="action-hover text-base text-center"
              >
                {props.products[1].title}
              </a>
              </Link>
            </h4>
          </div>
        </div>
        <div className={cx(s.productWrap, 'lg:hidden xl:hidden 2xl:block')}>
          <div className="product">
          <Link href="">
            <a href="" className="action-hover">
              <Image
                width={240}
                height={240}
                src={props.products[5].image}
              />
            </a>
            </Link>
          </div>
          <div className="product-detail">
            <h4 className="box-title">
            <Link href="/products/corrugated-mailer-boxes">
              <a
                className="action-hover text-base text-center"
              >
                {props.products[5].title}
              </a>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDemoList;
