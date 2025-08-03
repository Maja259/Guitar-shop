import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ApolloProvider} from '@apollo/client';
import { BrowserRouter } from "react-router-dom";
import client from './apollo/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <ApolloProvider client={client}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
      </ApolloProvider>
  // </React.StrictMode>
);


