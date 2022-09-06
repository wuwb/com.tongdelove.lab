import { FC, useState, createContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './base';
// import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';


export const ThemeContext = createContext((_themeName: string): void => { });

type Porps = {
  children: React.ReactNode;
}

const ThemeProviderWrapper: FC<Porps> = (props) => {
  const [themeName, _setThemeName] = useState('PureLightTheme');

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || 'PureLightTheme';
    _setThemeName(curThemeName);
  }, []);

  const theme = themeCreator(themeName);

  const setThemeName = (themeName: string): void => {
    window.localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
