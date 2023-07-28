import { getAllLocales, getLocale } from '@umijs/max';
import { Layout, Space, Table, Tag } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  content: css`
    position: relative;
    width: 1260px;
    margin: 20px auto;
  `,
}));

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: '昨日点评',
    dataIndex: 'comment',
    key: 'comment',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '相关个股',
    key: 'relate',
    dataIndex: 'relate',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: '锂',
    desc: '',
    comment: '',
    tags: ['金属', 'developer'],
    relate: ['赣锋锂业', 'developer'],
  },

  {
    key: '2',
    name: '镍',
    desc: '三元正极材料不可或缺的元素之一',
    comment: '',
    tags: ['金属'],
    relate: ['loser'],
  },
  {
    key: '3',
    name: '锰',
    desc: '三元正极材料不可或缺的元素之一',
    comment: '',
    tags: ['金属', 'teacher'],
    relate: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: '磷',
    desc: '磷酸铁锂电池材料',
    comment: '',
    tags: ['化工', 'teacher'],
    relate: ['cool', 'teacher'],
  },
  {
    key: '5',
    name: '纯碱',
    desc: '光伏玻璃原材料，磷酸锂生产原材料',
    comment: '',
    tags: ['化工', 'teacher'],
    relate: ['cool', 'teacher'],
  },
  {
    key: '6',
    name: '钠',
    desc: '钠离子电池',
    comment: '',
    tags: ['金属', 'teacher'],
    relate: ['cool', 'teacher'],
  },
  {
    key: '7',
    name: '锑',
    desc: '电池候选材料',
    comment: '',
    tags: ['金属', 'teacher'],
    relate: ['cool', 'teacher'],
  },
  {
    key: '8',
    name: '钒',
    desc: '电池候选材料',
    comment: '',
    tags: ['金属', 'teacher'],
    relate: ['cool', 'teacher'],
  },
  {
    key: '9',
    name: '氢',
    desc: '绿色能源',
    comment: '',
    tags: ['cool', 'teacher'],
    relate: ['cool', 'teacher'],
  },
  {
    key: '10',
    name: '硅',
    desc: '光伏、半导体基础原料，新型负极材料硅碳负极原料',
    comment: '',
    tags: ['cool', 'teacher'],
    relate: ['cool', 'teacher'],
  },
  {
    key: '11',
    name: '钴',
    desc: '',
    comment: '',
    tags: ['金属', 'developer'],
    relate: ['华友钴业', '洛阳钼业'],
  },
  {
    key: '12',
    name: '甲苯二异氰酸酯',
    enName: 'TDI',
    relate: ['沧州大化（002246）', '航锦科技（002246）', '北化股份（002246）'],
  },
];

const FinanceMaterialsPage = (props) => {
  const { styles, cx, theme } = useStyles();

  console.log('getAllLocales: ', getAllLocales()); // en-US,zh-CN
  console.log('getLocale: ', getLocale()); // en-US | zh-CN

  return (
    <Layout.Content>
      <div className={styles.content}>
        <Table columns={columns} dataSource={data} />
      </div>
    </Layout.Content>
  );
};

export default FinanceMaterialsPage;
