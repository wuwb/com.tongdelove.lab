import React from 'react'
import { AppContext, initialState, reducer } from './common/store'
import Grids from './Grids'
import Settings from './Settings'
import { useStyles } from './styles'

/**
 * 网格交易策略，迁移自 https://github.com/hushicai/ETF
 */
export default function EtfStrategy() {
  const { styles } = useStyles()
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <div className={styles.wrapper}>
      <AppContext.Provider value={{ state, dispatch }}>
        <Settings />
        <Grids />
      </AppContext.Provider>
    </div>
  )
}
