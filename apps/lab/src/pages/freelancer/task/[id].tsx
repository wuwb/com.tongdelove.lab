import { Container } from '@/components/common'
import { Link } from '@/components/ui/'
import axios from '@/utils/axios'
import { InferGetServerSidePropsType } from 'next'

const HomePage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <Container className="text-gray-800">
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-4 bg-blue-100">
          <div className="mb-5 p-10">
            <div>
              <span className="font-bold">{props.title}</span>
              <span className="text-xl text-pink-700">￥{props.price}</span>
            </div>
            <div>{props.content}</div>
            <div>
              <span>{props.type}</span>
              <span>{props.time}</span>
            </div>
            <div className="flex gap-2 text-sm text-gray-600">
              <div>开发周期：{props.duration}</div> |
              <div>{props.bargain ? '可议价' : '固定价格'}</div> |
              <div>来源：{props.origin}</div> |<div>状态：{props.status}</div> |
              <div>申请人数：{props.applyCount}</div> |
              <div>查看次数：{props.visitCount}</div> |
              <div>开发类型：{props.developerType}</div> |
              <div>需求角色：{props.specificRole}</div>
            </div>
            <Link href={props.url}>访问原站</Link>
          </div>
        </div>
        <div className="bg-red-100">
          <div className="">sidebar</div>
        </div>
      </div>
    </Container>
  )
}

export default HomePage

export const getServerSideProps = async (context) => {
  const { id } = context.params

  try {
    const { data } = await axios.get(`/freelancer/tasks/${id}`)
    return {
      props: {
        ...data.data,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        data: 0,
      },
    }
  }
}
