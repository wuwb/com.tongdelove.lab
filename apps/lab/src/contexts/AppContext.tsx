'use client'

import {
  initState,
  type Action,
  type State,
  reducer,
} from '@/reducers/AppReducer'
import { createContext, useContext, useMemo, useReducer } from 'react'

type AppContextProps = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const AppContext = createContext<AppContextProps>(null!)

export function useAppContext() {
  return useContext(AppContext)
}

export const AppContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const contextValue = useMemo(() => {
    return {
      state,
      dispatch,
    }
  }, [state, dispatch])

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
