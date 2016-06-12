import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import '../css/main.scss';

const store = configureStore();

const poistHolder = document.createElement('div');
poistHolder.id = 'poist-holder';
document.body.appendChild(poistHolder);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('poist-holder')
);
