import { SiderBox } from '@/components/Sider';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const NewTips = () => {
  return (
    <SiderBox>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="目录" key="4">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="发帖提示" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="社区指导原则" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="帮助" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </SiderBox>
  );
};

export default NewTips;
