import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../src/store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root')
);

