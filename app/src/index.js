import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';

import App from './App';
import configureStore from './store/configureStore';
import { ModalProvider } from 'react-modal-hook';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider rootComponent={TransitionGroup}>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
