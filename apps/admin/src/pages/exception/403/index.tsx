import { Link } from '@umijs/max'
import { Button, Result } from 'antd'

const Page403 = () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle="Sorry, you don't have access to this page."
    extra={
      <Link to="/">
        <Button type="primary">Back to home</Button>
      </Link>
    }
  />
)

export default Page403
