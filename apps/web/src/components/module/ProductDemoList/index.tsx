import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import s from './ProductDemoList.module.css'

export const ProductDemoList = (props) => {
  return (
    <div
      className={clsx(
        s.col4demo,
        'mx-auto lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl'
      )}
    >
      <div className="font-heading px-2 py-4 text-2xl">{props.title}</div>
      <div className="flex flex-wrap justify-center gap-2">
        <div className={clsx(s.productWrap)}>
          <div className="product">
            <Link href="">
              <a href="" className="action-hover">
                <Image
                  className="w-10"
                  width={240}
                  height={240}
                  src={props.products[0].image}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="product-detail">
            <h4 className="box-title">
              <Link href="/products/corrugated-mailer-boxes">
                <a className="action-hover text-center text-base">
                  {props.products[0].title}
                </a>
              </Link>
            </h4>
          </div>
        </div>
        <div className={clsx(s.productWrap)}>
          <div className="product">
            <Link href="">
              <a href="" className="action-hover">
                <Image
                  width={240}
                  height={240}
                  src={props.products[1].image}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="product-detail">
            <h4 className="box-title">
              <Link href="/products/corrugated-mailer-boxes">
                <a className="action-hover text-center text-base">
                  {props.products[1].title}
                </a>
              </Link>
            </h4>
          </div>
        </div>
        <div className={clsx(s.productWrap)}>
          <div className="product">
            <Link href="">
              <a href="" className="action-hover">
                <Image
                  width={240}
                  height={240}
                  src={props.products[2].image}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="product-detail">
            <h4 className="box-title">
              <Link href="/products/corrugated-mailer-boxes">
                <a className="action-hover text-center text-base">
                  {props.products[2].title}
                </a>
              </Link>
            </h4>
          </div>
        </div>
        <div className={clsx(s.productWrap)}>
          <div className="product">
            <Link href="">
              <a href="" className="action-hover">
                <Image
                  width={240}
                  height={240}
                  src={props.products[3].image}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="product-detail">
            <h4 className="box-title">
              <Link href="/products/corrugated-mailer-boxes">
                <a className="action-hover text-center text-base">
                  {props.products[3].title}
                </a>
              </Link>
            </h4>
          </div>
        </div>
        <div className={clsx(s.productWrap, 'lg:hidden xl:block')}>
          <div className="product">
            <Link href="">
              <a href="" className="action-hover">
                <Image
                  width={240}
                  height={240}
                  src={props.products[4].image}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="product-detail">
            <h4 className="box-title">
              <Link href="/products/corrugated-mailer-boxes">
                <a className="action-hover text-center text-base">
                  {props.products[1].title}
                </a>
              </Link>
            </h4>
          </div>
        </div>
        <div className={clsx(s.productWrap, 'lg:hidden xl:hidden 2xl:block')}>
          <div className="product">
            <Link href="">
              <a href="" className="action-hover">
                <Image
                  width={240}
                  height={240}
                  src={props.products[5].image}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className="product-detail">
            <h4 className="box-title">
              <Link href="/products/corrugated-mailer-boxes">
                <a className="action-hover text-center text-base">
                  {props.products[5].title}
                </a>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}
