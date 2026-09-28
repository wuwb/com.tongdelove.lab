import React, { useEffect, useReducer } from 'react'
import { message } from 'antd'
import { useLocation } from '@umijs/max'
import { AppContext, initialState, reducer, useLoadPlan } from './common/store'
import { getGridPlan } from '@/services/etf/gridPlan'
import Grids from './Grids'
import Settings from './Settings'
import { useStyles } from './styles'

/**
 * 网格交易策略，迁移自 https://github.com/hushicai/ETF
 */
export default function EtfStrategy() {
  const { styles } = useStyles()
  const [state, dispatch] = useReducer(reducer, initialState)
  const loadPlan = useLoadPlan()
  const planId = new URLSearchParams(useLocation().search).get('planId')

  useEffect(() => {
    if (!planId) {
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const plan = await getGridPlan({ id: planId })
        if (!cancelled && plan?.config) {
          loadPlan(plan.config)
        }
      } catch (e) {
        console.error('[EtfStrategy] loadPlan', e)
        message.error('加载方案失败')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [planId, loadPlan])

  return (
    <div className={styles.wrapper}>
      <AppContext.Provider value={{ state, dispatch }}>
        <Settings />
        <Grids />
      </AppContext.Provider>
    </div>
  )
}
