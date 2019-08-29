/**
 * dependencias ( mensagem de erros e avisos )
 * yarn add react-toastify
 *
 */
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './config/ReactotronConfig';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routers from './routes';

import history from './services/history';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <GlobalStyle />
        <Routers />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
}

export default App;
