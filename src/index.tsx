import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#10AC84',
      dark: '#0E8E6D',
      contrastText: '#FFFFFF'
    },
    text:{
      primary:'#636E72'
    },
    background:{
      default:'f3f3f3'
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
