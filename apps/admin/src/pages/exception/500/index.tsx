import { Link } from '@umijs/max'
import { Button, Result } from 'antd'

const Page500 = () => (
  <Result
    status="500"
    title="500"
    style={{
      background: 'none',
    }}
    subTitle="Sorry, the server is reporting an error."
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
)

export default Page500
