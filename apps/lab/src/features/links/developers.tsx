import { Link } from '@/components/ui'
import { Table } from '@mantine/core'

export const Home = () => {
  // {
  //   name: '',
  //   site: '',
  //   siteName: '',
  //   link: '',
  // }
  const data = [
    {
      name: 'GeekPlux',
      description:
        'Data Visualization & Full-stack programmer @ finance firm, Blogger, Cat lover, Lifelong learner.',
      site: '',
      siteName: 'GeekPlux',
      link: 'https://geekplux.com/',
    },
    {
      name: 'zhang0peter',
      site: '喜欢Python，工作用Java',
      siteName: 'zhang0peter的博客',
      link: 'https://zhang0peter.com/',
    },
    {
      name: 'Geekhmer',
      site: '',
      siteName: 'Geekhmer',
      link: 'http://geekhmer.github.io/',
    },
  ]

  data.forEach((item: any) => {
    item.site = (
      <Link href={item.link} icon color>
        {item.siteName}
      </Link>
    )
  })

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'site',
      dataIndex: 'site',
      key: 'site',
    },
  ]

  return <Table />
}
