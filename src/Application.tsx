import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { StylesProvider } from '@material-ui/styles';
import getTheme, { ThemeMode } from './theme';
import { SnackbarProvider } from 'notistack';

import AOS from 'aos';

export const useDarkMode = () => {
  
  const [themeMode, setTheme] = useState<ThemeMode>('light');
  //mode toggle
  const [mountedComponent, setMountedComponent] = useState(false);

  //set mode in localstorage
  //mode is dark or light
  const setMode = (mode:ThemeMode) => {
    window.localStorage.setItem('themeMode', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    themeMode === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('themeMode') as ThemeMode;
    localTheme ? setTheme(localTheme) : setMode('light');
    setMountedComponent(true);
    AOS.refresh();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [themeMode]);

  return {
    themeMode,
    themeToggler,
    mountedComponent,
  };
};

interface Props {
  component: any;
  // All other props
  [x: string]: any;
}

/**
 * The main of application
 * @param Props 
 * @return JSX.Element
 */
export default function Application({
  component: Component,
  ...rest
}: Props): JSX.Element {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    // const jssStyles = document.querySelector('#jss-server-side');
    // if (jssStyles) {
    //   jssStyles.parentElement.removeChild(jssStyles);
    // }

    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: 'ease-in-out',
    });

  }, []);

  const { themeMode, themeToggler, mountedComponent } = useDarkMode();
  
  useEffect(() => {
    AOS.refresh();
  }, [mountedComponent]);

  return (
    <StylesProvider injectFirst={true}>
      <ThemeProvider theme={getTheme(themeMode)}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        maxSnack={3}>
          <Paper elevation={0}>
            {/* <Layout themeMode={themeMode} themeToggler={themeToggler}> */}
              <Component themeMode={themeMode} {...rest} />
            {/* </Layout> */}
          </Paper>
        </SnackbarProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}