import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from "./store/store";
import { Context  } from './Context';
export const store = new Store()

console.log(store);
ReactDOM.render(
  <Context.Provider value={store}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

