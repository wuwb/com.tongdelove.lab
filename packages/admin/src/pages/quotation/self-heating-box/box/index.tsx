import { PageHeader } from '@ant-design/pro-components';
import React, { useState, useEffect } from 'react';
import { Spin, Card, Form, InputNumber, Button, } from 'antd';
import { FormInstance } from 'antd/lib/form';
import _ from 'lodash';
import {
  FormItem,
  Editable,
  Input,
  Select,
  Radio,
  DatePicker,
  ArrayItems,
  FormButtonGroup,
  Submit,
  Space,
  NumberPicker,
  Cascader,
} from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
import { action } from '@formily/reactive';
import styles from './index.less';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Editable,
    DatePicker,
    Space,
    Radio,
    Input,
    Select,
    ArrayItems,
    NumberPicker,
    Cascader,
  },
});

const transformAddress = (data = {}) => {
  return Object.entries(data).reduce((buf, [key, value]) => {
    if (typeof value === 'string') {
      return buf.concat({
        label: value,
        value: key,
      });
    }
    const { name, code, cities, districts } = value;
    const _cities = transformAddress(cities);
    const _districts = transformAddress(districts);
    return buf.concat({
      label: name,
      value: code,
      children: _cities.length
        ? _cities
        : _districts.length
          ? _districts
          : undefined,
    });
  }, []);
}

const useAsyncDataSource = (url: string, transform: (data: any) => any) => (field) => {
  field.loading = true;
  fetch(url)
    .then((res) => res.json())
    .then(
      action.bound((data) => {
        field.dataSource = transform(data)
        field.loading = false
      })
    );
}

const form = createForm();

const schema = {
  type: 'object',
  properties: {
    box: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: '餐盒',
      items: {
        type: 'object',
        properties: {
          space: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              sort: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.SortHandle',
              },
              type: {
                type: 'string',
                title: '型号',
                enum: [
                  { label: '1号', value: 1 },
                  { label: '2号', value: 2 },
                ],
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  style: {
                    width: 160,
                  },
                },
              },
              count: {
                type: 'string',
                title: '数量',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              remove: {
                type: 'void',
                title: '删除',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.Remove',
              },
              add: {
                type: 'void',
                title: '添加',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.Addition',
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
    heatingBag: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: '加热包',
      items: {
        type: 'object',
        properties: {
          space: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              sort: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.SortHandle',
              },
              type: {
                type: 'string',
                title: '重量',
                enum: [
                  { label: '1号', value: 1 },
                  { label: '2号', value: 2 },
                ],
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  style: {
                    width: 160,
                  },
                },
              },
              count: {
                type: 'string',
                title: '数量',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              remove: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.Remove',
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
    accessories: {
      type: 'array',
      'x-component': 'ArrayItems',
      'x-decorator': 'FormItem',
      title: '配件',
      items: {
        type: 'object',
        properties: {
          space: {
            type: 'void',
            'x-component': 'Space',
            properties: {
              sort: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.SortHandle',
              },
              type: {
                type: 'string',
                title: '配件',
                enum: [
                  { label: '筷子', value: 1 },
                  { label: '勺子', value: 2 },
                  { label: '叉勺', value: 3 },
                ],
                'x-decorator': 'FormItem',
                'x-component': 'Select',
                'x-component-props': {
                  style: {
                    width: 160,
                  },
                },
              },
              count: {
                type: 'string',
                title: '数量',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
              remove: {
                type: 'void',
                'x-decorator': 'FormItem',
                'x-component': 'ArrayItems.Remove',
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          title: '添加条目',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
    address: {
      type: 'string',
      title: '地址选择',
      'x-decorator': 'FormItem',
      'x-component': 'Cascader',
      'x-component-props': {
        style: {
          width: 240,
        },
      },
      'x-reactions': [
        '{{useAsyncDataSource("//unpkg.com/china-location/dist/location.json",transformAddress)}}',
      ],
    },
  },
};

export default () => {

  return (
    <PageHeader>
      <Card>

        <FormProvider form={form}>
          <SchemaField
            schema={schema}
            scope={{ useAsyncDataSource, transformAddress }}
          />
          <FormButtonGroup>
            <Submit onSubmit={console.log}>提交</Submit>
          </FormButtonGroup>
        </FormProvider>

      </Card>
    </PageHeader>
  );
};
