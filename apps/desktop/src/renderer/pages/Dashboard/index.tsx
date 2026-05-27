import { useState, useEffect } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  getVersion,
  getAllVersions,
  checkVersion,
  checkAllVersions,
  installVersion,
  updateVersion,
  updateAllVersions
} from '../../lib/version-api'
import { NavLink, Outlet } from 'react-router'

export function DashboardPage() {
  return (
    <div style={{ height: 'calc(100vh - 48px)', padding: '20px' }}>
      <div style={{ display: 'flex', height: '100%', gap: '20px' }}>
        <div
          style={{
            width: '200px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid #e5e7eb'
          }}>
          <ul className="gap-2">
            <li
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}>
              <NavLink to={'/dashboard/usage'} title="使用统计" style={{ textDecoration: 'none' }}>
                使用统计
              </NavLink>
            </li>
            <li
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                borderRadius: '6px',
                transition: 'all 0.2s'
              }}>
              <NavLink to={'/dashboard/versions'} title="版本管理" style={{ textDecoration: 'none' }}>
                版本管理
              </NavLink>
            </li>
          </ul>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
