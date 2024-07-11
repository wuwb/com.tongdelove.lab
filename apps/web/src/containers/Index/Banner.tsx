import { Carousel } from 'antd';
import Image from 'next/image';
import Banner1 from './1.png';
import Banner2 from './2.png';

// import 'antd/lib/carousel/style/css';

const Banner = () => {
  function onChange(current) {
    console.log(current);
  }
  return (
    <Carousel afterChange={onChange} dotPosition="right" autoplay autoplaySpeed={7000}>
      <div>
        <Image src={Banner1} />
      </div>
      <div>
        <Image src={Banner2} />
      </div>
    </Carousel>
  )
}

export default Banner;
