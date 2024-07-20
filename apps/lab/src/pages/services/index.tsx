import { Container } from '@/components/common'

const HomePage = (props) => {
  return (
    <Container className="text-gray-800">
      <div>
        <h3>国外</h3>
        <ul>
          <li>https://www.toptal.com/</li>
          <li>https://www.upwork.com/</li>
        </ul>
      </div>
      <div>
        <h3>国内</h3>
        <div>开放接单平台</div>
        <ul>
          <li></li>
        </ul>
        <div>项目分配接单平台</div>
        <ul>
          <li>飞猿 www.freetalen.com</li>
          <li>程序员客栈</li>
        </ul>
      </div>
    </Container>
  )
}

export default HomePage
