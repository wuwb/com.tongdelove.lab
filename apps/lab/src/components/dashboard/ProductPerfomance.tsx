import React from 'react'
import { Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@tongdelove/ui/components/table'
import { BaseCard } from '@/components/module/baseCard/BaseCard'

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

export const ProductPerfomance = () => {
  return (
    <BaseCard title="Product Perfomance">
      <Table
        aria-label="simple table"
        style={{
          mt: 3,
          whiteSpace: 'nowrap',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <div color="divSecondary" variant="h6">
                Id
              </div>
            </TableCell>
            <TableCell>
              <div color="divSecondary" variant="h6">
                Assigned
              </div>
            </TableCell>
            <TableCell>
              <div color="divSecondary" variant="h6">
                Name
              </div>
            </TableCell>
            <TableCell>
              <div color="divSecondary" variant="h6">
                Priority
              </div>
            </TableCell>
            <TableCell align="right">
              <div color="divSecondary" variant="h6">
                Budget
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.name}>
              <TableCell>
                <div
                  sx={{
                    fontSize: '15px',
                    fontWeight: '500',
                  }}
                >
                  {product.id}
                </div>
              </TableCell>
              <TableCell>
                <div
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div variant="h6" className="font-bold">
                      {product.name}
                    </div>
                    <div
                      className=""
                      style={{
                        fontSize: '13px',
                      }}
                    >
                      {product.post}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div variant="h6">{product.pname}</div>
              </TableCell>
              <TableCell>{product.priority}</TableCell>
              <TableCell align="right">
                <div variant="h6">${product.budget}k</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  )
}
