import 'global.scss';
import "@fontsource/cooper-hewitt";
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import App from 'app';
import { AppProvider } from 'providers/app';
import * as serviceWorker from './serviceWorker';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>
      {
        process.env.REACT_APP_ENVIRONMENT === 'development' &&
        <ReactQueryDevtools position='bottom-right' />
      }
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
