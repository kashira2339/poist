import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/main.scss';

import PoistList from './components/PoistList';

const poistHolder = document.createElement('div');
poistHolder.id = 'poist-holeder';
document.body.appendChild(poistHolder);

render(
  <PoistList />,
  document.getElementById('poist-holeder')
);
