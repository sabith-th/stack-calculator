import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Main from './Main';
import { reducer } from './module';

const store = createStore(reducer);

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
