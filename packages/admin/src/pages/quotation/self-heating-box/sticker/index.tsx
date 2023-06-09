import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from '@umijs/max';
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, Field, createSchemaField } from '@formily/react'
import {
  FormItem,
  FormLayout,
  Input,
  FormButtonGroup,
  Submit,
  Radio,
  NumberPicker,
  FormGrid,
  Switch,
  Select,
  Checkbox,
} from '@formily/antd-v5';

const SchemaField = createSchemaField({
  components: {
    Radio,
    NumberPicker,
    FormGrid,
    FormItem,
    Switch,
    Select,
    Checkbox,
  },
})

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    paperType: {
      type: 'number',
      title: '纸张类型',
      enum: [
        {
          label: '白卡纸',
          value: 1,
        },
        {
          label: '铜版纸',
          value: 2,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    paperWeight: {
      type: 'number',
      title: '纸张重量',
      enum: [
        {
          label: '100g',
          value: 100,
        },
        {
          label: '200g',
          value: 200,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    paperSizeGrid: {
      type: 'void',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: [4, 6, 10],
      },
      properties: {
        paperSize: {
          type: 'number',
          title: '纸张尺寸',
          enum: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
          ],
          'x-decorator': 'FormItem',
          'x-component': 'Select',
        },
        enablePaperSizeCustom: {
          type: 'boolean',
          title: '自定义纸张尺寸',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
        },
        paperSizeHeight: {
          type: 'number',
          title: '纸张长',
          'x-decorator': 'FormItem',
          'x-component': "NumberPicker",
        },
        paperSizeWidth: {
          type: 'number',
          title: '纸张宽',
          'x-decorator': 'FormItem',
          'x-component': "NumberPicker",
        }
      }
    },
    printSide: {
      type: 'number',
      title: '印刷面数',
      enum: [
        {
          label: '单面',
          value: 1,
        },
        {
          label: '双面',
          value: 2,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    printColor: {
      type: 'number',
      title: '印刷颜色',
      enum: [
        {
          label: '彩色',
          value: 1,
        },
        {
          label: '单黑',
          value: 2,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
    },
    printProcess: {
      type: 'array',
      title: '工艺',
      enum: [
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 2,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox.Group',
    },
    printKind: {
      type: 'number',
      title: '印刷款式',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
    },
    printCountGrid: {
      type: 'void',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: [4, 6, 10],
        maxColumns: 6,
      },
      properties: {
        printCount: {
          type: 'number',
          title: '印刷数量',
          enum: [
            { label: '200', value: 1 },
            { label: '500', value: 2 },
            { label: '1000', value: 3 },
            { label: '2000', value: 4 },
            { label: '5000', value: 5 },
          ],
          'x-decorator-props': { gridSpan: 3 },
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
        },
        enablePrintCountCustom: {
          type: 'boolean',
          title: '自定义数量',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
        },
        printCountCustom: {
          type: 'number',
          title: '数量',
          'x-decorator': 'FormItem',
          'x-component': "NumberPicker",
        },
      }
    },
  },
}

const Page = (): React.ReactNode => {
  const intl = useIntl();

  return (
    <PageContainer>
      <Card>
        <FormProvider form={form}>
          <FormLayout layout="horizontal">
            <SchemaField schema={schema} />
          </FormLayout>

          <FormButtonGroup>
            <Submit onSubmit={console.log}>计算价格</Submit>
          </FormButtonGroup>

          <FormConsumer>
            {() => (
              <>
                <div
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    padding: 5,
                    border: '1px dashed #666',
                  }}
                >
                  订单明细：{form.values.paperType}
                </div>
                <div>
                  订单价格：
                </div>
                <div>
                  预计出货时间：
                </div>
              </>
            )}
          </FormConsumer>

          <FormButtonGroup>
            <Submit onSubmit={console.log}>立即下单</Submit>
          </FormButtonGroup>
        </FormProvider>
      </Card>
    </PageContainer>
  );
};

export default Page;
