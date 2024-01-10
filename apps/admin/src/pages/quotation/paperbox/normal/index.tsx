import { PageContainer } from '@ant-design/pro-components';
import ProForm, {
  ProFormFieldSet,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import { ActionType } from '@ant-design/pro-table';
import { Card, Collapse, Descriptions, Divider, message, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import { TableListItem } from './data.d';
const { Title, Paragraph, Text, Link } = Typography;
const { Panel } = Collapse;

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);

  // queryRule 获取数据
  return (
    <PageContainer>
      <Card>
        <ProForm<{
          name: string;
          company: string;
        }>
          onFinish={async (values) => {
            await waitTime(2000);
            console.log(values);
            message.success('提交成功');
          }}
          initialValues={{
            name: '蚂蚁设计有限公司',
            useMode: 'chapter',
          }}
        >
          <Title level={3}>盒型设置</Title>
          <ProForm.Group>
            <ProFormSelect
              tooltip="最长为 24 位"
              width="md"
              options={[
                {
                  value: 'time',
                  label: '双插盒',
                },
                {
                  value: 'time',
                  label: '胶粘侧封盒',
                },
                {
                  value: 'time',
                  label: '手提自封扣底盒',
                },
                {
                  value: 'time',
                  label: '飞机盒',
                },
                {
                  value: 'time',
                  label: '单边盒自动扣底盒',
                },
                {
                  value: 'time',
                  label: '胶粘双插口封底盒',
                },
                {
                  value: 'time',
                  label: '单边插口扣底盒',
                },
                {
                  value: 'time',
                  label: '带勾单插口扣底盒',
                },
                {
                  value: 'time',
                  label: '抽屉盒',
                },
                {
                  value: 'time',
                  label: '天地盖盒',
                },
                {
                  value: 'time',
                  label: '开窗挂盒',
                },
                {
                  value: 'time',
                  label: '胶贴侧封盒',
                },
              ]}
              name="type"
              label="盒子类型"
            />
          </ProForm.Group>
          <ProForm.Group>
            自定义大小
            <ProFormFieldSet
              name="list"
              label="折叠大小"
              transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
            >
              <ProFormText width="xs" name="x" label="长" placeholder="输长度" />
              <ProFormText width="xs" name="y" label="宽" placeholder="输宽度" />
              <ProFormText width="xs" name="z" label="高" placeholder="输高度" />
            </ProFormFieldSet>
            <ProFormFieldSet
              name="list"
              label="展开大小"
              transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
            >
              <ProFormText width="xs" name="y" label="宽" placeholder="输宽度" />
              <ProFormText width="xs" name="z" label="高" placeholder="输高度" />
            </ProFormFieldSet>
          </ProForm.Group>
          <ProForm.Group>
            固定大小
            <ProFormSelect
              tooltip="最长为 24 位"
              width="md"
              options={[
                {
                  value: 'time',
                  label: '履行完终止',
                },
              ]}
              name="type"
              label="大小尺寸"
            />
          </ProForm.Group>
          <Divider />
          <Title level={3}>纸张设置</Title>

          <ProForm.Group>
            <ProFormSelect
              width="xs"
              options={[
                {
                  value: 'time',
                  label: '履行完终止',
                },
              ]}
              name="type"
              label="纸张品牌"
            />
            <ProFormSelect
              width="xs"
              options={[
                {
                  value: 'time',
                  label: '白卡纸',
                },
                {
                  value: 'time',
                  label: '灰卡纸',
                },
                {
                  value: 'time',
                  label: '3层瓦楞纸',
                },
                {
                  value: 'time',
                  label: '5层瓦楞纸',
                },
                {
                  value: 'time',
                  label: '铜版纸',
                },
                {
                  value: 'time',
                  label: '牛皮纸',
                },
                {
                  value: 'time',
                  label: '特种纸',
                },
                {
                  value: 'time',
                  label: '金卡纸',
                },
                {
                  value: 'time',
                  label: '银卡纸',
                },
              ]}
              name="type"
              label="纸张类型"
            />
            <ProFormSelect
              width="xs"
              options={[
                {
                  value: 'time',
                  label: '90g',
                },
                {
                  value: 'time',
                  label: '110g',
                },
                {
                  value: 'time',
                  label: '120g',
                },
                {
                  value: 'time',
                  label: '150g',
                },
                {
                  value: 'time',
                  label: '200g',
                },
                {
                  value: 'time',
                  label: '230g',
                },
                {
                  value: 'time',
                  label: '250g',
                },
                {
                  value: 'time',
                  label: '280g',
                },
                {
                  value: 'time',
                  label: '300g',
                },
                {
                  value: 'time',
                  label: '400g',
                },
              ]}
              name="type"
              label="纸张重量"
            />

            <ProFormText width="xs" name="num" label="印刷数量" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              width="xs"
              options={[
                {
                  value: 'time',
                  label: '履行完终止',
                },
              ]}
              name="type"
              label="印刷类型"
            />
          </ProForm.Group>

          <Divider />

          <Descriptions
            title={<Title level={3}>可选工序</Title>}
            bordered
            size="small"
            labelStyle={{ width: 208 }}
          >
            <Descriptions.Item label="粘盒套" span={3}>
              <ProFormSwitch name="switch" />
            </Descriptions.Item>
            <Descriptions.Item label="啤异型/模切" span={3}>
              <ProFormSwitch name="switch" />
            </Descriptions.Item>
            <Descriptions.Item label="压纹" span={3}>
              <ProFormSwitch name="switch" />
            </Descriptions.Item>

            <Descriptions.Item label="击凸" span={3}>
              <ProFormSwitch name="switch" />
              <ProFormFieldSet
                name="list"
                label="大小"
                transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
              >
                <ProFormText width="xs" name="x" label="长" placeholder="输长度" />
                <ProFormText width="xs" name="y" label="宽" placeholder="输宽度" />
                <ProFormText width="xs" name="z" label="高" placeholder="输高度" />
              </ProFormFieldSet>
            </Descriptions.Item>

            <Descriptions.Item label="过胶" span={3}>
              <ProFormSwitch name="switch" />
              <ProFormRadio.Group
                name="radio"
                options={[
                  {
                    label: '单面光胶',
                    value: 'a',
                  },
                  {
                    label: '单面哑胶',
                    value: 'b',
                  },
                  {
                    label: '单面PET覆膜',
                    value: 'c',
                  },
                ]}
              />
            </Descriptions.Item>

            <Descriptions.Item label="过油/印油/磨光" span={3}>
              <ProFormSwitch name="switch" />
              <ProFormRadio.Group
                name="radio"
                options={[
                  {
                    label: '单面过光油',
                    value: 'a',
                  },
                  {
                    label: '单面过哑油',
                    value: 'b',
                  },
                  {
                    label: '单面印光油',
                    value: 'c',
                  },
                  {
                    label: '单面印哑油',
                    value: 'c',
                  },
                  {
                    label: '单面磨光',
                    value: 'c',
                  },
                ]}
              />
            </Descriptions.Item>

            <Descriptions.Item label="烫金/烫银" span={3}>
              <ProFormSwitch name="switch" />
              <ProForm.Group>
                <ProFormSwitch name="switch" label="单面烫普通金/银" />
                <ProFormFieldSet
                  name="list"
                  label="大小"
                  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
                >
                  <ProFormText width="xs" name="x" label="长" placeholder="输长度" />
                  <ProFormText width="xs" name="y" label="宽" placeholder="输宽度" />
                  <ProFormText width="xs" name="z" label="高" placeholder="输高度" />
                </ProFormFieldSet>
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSwitch name="switch" label="单面烫镭射金/银" />
                <ProFormFieldSet
                  name="list"
                  label="大小"
                  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
                >
                  <ProFormText width="xs" name="x" label="长" placeholder="输长度" />
                  <ProFormText width="xs" name="y" label="宽" placeholder="输宽度" />
                  <ProFormText width="xs" name="z" label="高" placeholder="输高度" />
                </ProFormFieldSet>
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSwitch name="switch" label="单面烫特种金/银" />
                <ProFormFieldSet
                  name="list"
                  label="大小"
                  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
                >
                  <ProFormText width="xs" name="x" label="长" placeholder="输长度" />
                  <ProFormText width="xs" name="y" label="宽" placeholder="输宽度" />
                  <ProFormText width="xs" name="z" label="高" placeholder="输高度" />
                </ProFormFieldSet>
              </ProForm.Group>
            </Descriptions.Item>

            <Descriptions.Item label="UV" span={3}>
              <ProFormSwitch className="" name="switch" style={{ width: '100%' }} />
              <ProForm.Group>
                <ProFormSwitch name="switch" label="单面局部UV" />
                <ProFormFieldSet
                  name="list"
                  label="大小"
                  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
                >
                  <ProFormText width="xs" name="x" label="长" placeholder="输长度" />
                  <ProFormText width="xs" name="y" label="宽" placeholder="输宽度" />
                  <ProFormText width="xs" name="z" label="高" placeholder="输高度" />
                </ProFormFieldSet>
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSwitch name="switch" label="单面七彩UV" />
                <ProFormFieldSet
                  name="list"
                  label="大小"
                  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
                >
                  <ProFormText width="xs" name="x" label="长" placeholder="输长度" />
                  <ProFormText width="xs" name="y" label="宽" placeholder="输宽度" />
                  <ProFormText width="xs" name="z" label="高" placeholder="输高度" />
                </ProFormFieldSet>
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSwitch name="switch" label="单面彩葱UV" />
                <ProFormFieldSet
                  name="list"
                  label="大小"
                  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
                >
                  <ProFormText width="xs" name="x" label="长" placeholder="输长度" />
                  <ProFormText width="xs" name="y" label="宽" placeholder="输宽度" />
                  <ProFormText width="xs" name="z" label="高" placeholder="输高度" />
                </ProFormFieldSet>
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSwitch name="switch" label="单面皱纹UV" />
                <ProFormFieldSet
                  name="list"
                  label="大小"
                  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
                >
                  <ProFormText width="xs" name="x" label="长" placeholder="输长度" />
                  <ProFormText width="xs" name="y" label="宽" placeholder="输宽度" />
                  <ProFormText width="xs" name="z" label="高" placeholder="输高度" />
                </ProFormFieldSet>
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSwitch name="switch" label="单面磨砂UV" />
                <ProFormFieldSet
                  name="list"
                  label="大小"
                  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
                >
                  <ProFormText width="xs" name="x" label="长" placeholder="输长度" />
                  <ProFormText width="xs" name="y" label="宽" placeholder="输宽度" />
                  <ProFormText width="xs" name="z" label="高" placeholder="输高度" />
                </ProFormFieldSet>
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSwitch name="switch" label="单面满版UV" />
                <ProFormFieldSet
                  name="list"
                  label="大小"
                  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
                >
                  <ProFormText width="xs" name="x" label="长" placeholder="输长度" />
                  <ProFormText width="xs" name="y" label="宽" placeholder="输宽度" />
                  <ProFormText width="xs" name="z" label="高" placeholder="输高度" />
                </ProFormFieldSet>
              </ProForm.Group>
            </Descriptions.Item>

            <Descriptions.Item label="粘盒套" span={3}>
              <ProFormSwitch name="switch" />
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            title={<Title level={3}>可选配件</Title>}
            bordered
            size="small"
            labelStyle={{ width: 208 }}
          >
            <Descriptions.Item label="开窗" span={3}>
              <ProFormSwitch name="switch" />
            </Descriptions.Item>
          </Descriptions>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default TableList;
