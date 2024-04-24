import { Grids } from '@/features/ETFGrid/Grids'
import { Settings } from '@/features/ETFGrid/Settings'
import { AppContext, initialState, reducer } from '@/server/store'
import * as React from 'react'

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <div className="box container mx-auto max-w-screen-lg px-4">
      <div id="header">
        <h1 className="mb-8">ETF</h1>
      </div>
      <main>
        <AppContext.Provider value={{ state, dispatch }}>
          <Settings />
          <Grids />
        </AppContext.Provider>
      </main>
    </div>
  )
}

export default App
