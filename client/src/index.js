import React,{ createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from "./store/store";

export const store = new Store()
export const Context = createContext({store})

ReactDOM.render(
  <Context.Provider value={store}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

