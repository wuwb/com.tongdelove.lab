import { FC, createContext, useContext, useState, useEffect } from 'react'

const LayoutContext = createContext({
  classes: {
    footerContainer: [],
  },
})

const LayoutProvider = ({ children }) => {
  const [classes, setClasses] = useState({
    footerContainer: [],
  })

  const setLayout = () => {
    //
  }
  const value = {
    classes,
    setLayout,
  }
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

export { LayoutProvider, LayoutContext }
