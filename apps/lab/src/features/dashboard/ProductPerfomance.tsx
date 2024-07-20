import React from 'react'
import {
  TableTbody,
  TableThead,
  TableTd,
  TableTr,
  Chip,
  Text,
  Box,
  Table,
} from '@mantine/core'
import BaseCard from '@/components/module/baseCard/BaseCard'

const products = [
  {
    id: '1',
    name: 'Sunil Joshi',
    post: 'Web Designer',
    pname: 'Elite Admin',
    priority: 'Low',
    pbg: 'primary.main',
    budget: '3.9',
  },
  {
    id: '2',
    name: 'Andrew McDownland',
    post: 'Project Manager',
    pname: 'Real Homes WP Theme',
    priority: 'Medium',
    pbg: 'secondary.main',
    budget: '24.5',
  },
  {
    id: '3',
    name: 'Christopher Jamil',
    post: 'Project Manager',
    pname: 'MedicalPro WP Theme',
    priority: 'High',
    pbg: 'error.main',
    budget: '12.8',
  },
  {
    id: '4',
    name: 'Nirav Joshi',
    post: 'Frontend Engineer',
    pname: 'Hosting Press HTML',
    priority: 'Critical',
    pbg: 'success.main',
    budget: '2.4',
  },
]

const ProductPerfomance = () => {
  return (
    <BaseCard title="Product Perfomance">
      <Table
        aria-label="simple table"
        style={{
          mt: 3,
          whiteSpace: 'nowrap',
        }}
      >
        <TableThead>
          <TableTr>
            <TableTd>
              <Text color="textSecondary" variant="h6">
                Id
              </Text>
            </TableTd>
            <TableTd>
              <Text color="textSecondary" variant="h6">
                Assigned
              </Text>
            </TableTd>
            <TableTd>
              <Text color="textSecondary" variant="h6">
                Name
              </Text>
            </TableTd>
            <TableTd>
              <Text color="textSecondary" variant="h6">
                Priority
              </Text>
            </TableTd>
            <TableTd align="right">
              <Text color="textSecondary" variant="h6">
                Budget
              </Text>
            </TableTd>
          </TableTr>
        </TableThead>
        <TableTbody>
          {products.map((product) => (
            <TableTr key={product.name}>
              <TableTd>
                <Text
                  sx={{
                    fontSize: '15px',
                    fontWeight: '500',
                  }}
                >
                  {product.id}
                </Text>
              </TableTd>
              <TableTd>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Text variant="h6" className="font-bold">
                      {product.name}
                    </Text>
                    <Text
                      className=""
                      style={{
                        fontSize: '13px',
                      }}
                    >
                      {product.post}
                    </Text>
                  </Box>
                </Box>
              </TableTd>
              <TableTd>
                <Text variant="h6">{product.pname}</Text>
              </TableTd>
              <TableTd>{product.priority}</TableTd>
              <TableTd align="right">
                <Text variant="h6">${product.budget}k</Text>
              </TableTd>
            </TableTr>
          ))}
        </TableTbody>
      </Table>
    </BaseCard>
  )
}

export default ProductPerfomance
