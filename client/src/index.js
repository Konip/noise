import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Context } from './Context';
import './index.css';
import Store from "./store/store";
export const store = new Store()

// console.log(store);
ReactDOM.render(
  <Context.Provider value={store}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

