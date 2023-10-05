'use client'

import { initState, type Action, type State, reducer } from "@/reducers/AppReducer"
import type { Dispatch, ReactNode, SetStateAction } from "react"
import { createContext, useContext, useMemo, useReducer, useState } from "react"


type AppContextProps = {
  state: State
  dispatch: Dispatch<Action>
}

const AppContext = createContext<AppContextProps>(null!)

export function useAppContext() {
  return useContext(AppContext)
}

export default function AppContextProvider({
  children
}: {
  children: ReactNode
}) {
  console.log('AppContextProvider rendered')
  const [state, dispatch] = useReducer(reducer, initState)

  const contextValue = useMemo(() => {
    return {
      state, dispatch
    }
  }, [state, dispatch])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}
