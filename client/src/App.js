import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pages from './pages/Pages';
// import MenuAppBar from './components/AppBar';
// import Pages from './pages/Pages';

function App() {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'light' : 'light',
        },
      }),
    [prefersDarkMode]
  );
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
