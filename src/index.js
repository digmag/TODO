import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles.scss";
import Main from './Main/main.tsx';
import Header from './Header/header.tsx';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Header />
    <Main />
    </Provider>
  </React.StrictMode>
);

