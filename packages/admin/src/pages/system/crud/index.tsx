import React from 'react';
import { PageContainer } from '@ant-design/pro-components';

function Crud() {
  const fields = [
    {
      name: 'name',
      label: 'Name',
      field: {
        type: 'input',
        props: {
          placeholder: 'please input'
        }
      }
    }, {
      name: 'nat',
      label: 'Country',
      field: 'input'
    }, {
      name: 'email',
      label: 'Email',
      field: 'input'
    }, {
      name: 'index',
      label: 'Sequence',
      field: 'input'
    }, {
      name: 'age',
      label: 'Age',
      field: 'input'
    }, {
      name: 'others',
      label: 'Others',
      field: 'input'
    }
  ];
  const remoteDataSource = {
    url: 'http://rap2.taobao.org:38080/app/mock/256045/table/list',
    method: 'GET',
    convertParams({ params }) {
      return {
        results: 3,
        ...params,
      };
    },
    converter({ data }) {
      return {
        list: data.results.map((item, index) => {
          return {
            ...item,
            id: index,
            index,
          };
        }),
        total: 10,
      };
    },
  };
  const columns = [
    {
      title: 'Sequence',
      key: 'index'
    }, {
      title: 'Country',
      key: 'nat'
    }, {
      title: 'Age',
      key: 'age',
    }, {
      title: 'Name',
      key: 'name'
    }, {
      title: 'Email',
      key: 'email',
    },
    {
      title: 'Operator',
      key: 'operator',
      render: [
        {
          confirm: 'delete or not',
          type: 'icon',
          props: {
            type: 'delete'
          },
          action: [
            {
              type: 'request',
              url: 'http://rap2.taobao.org:38080/app/mock/256045/table/detele',
              method: 'POST',
              params: {
                id: '#{record.id}',
              },
              successMessage: 'successfully deleted',
            },
            'refreshTable'
          ]
        }
      ]
    }
  ];
  return (
    <PageContainer>

    </PageContainer>
  );
}

export default Crud;
