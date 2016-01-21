import React from 'react';
import {render} from 'react-dom';
import App from './components/App';

// TODO: add correct collection names once api set up
render(
  <App collections={['test', 'streets', 'categories']} />,
  document.querySelector('#admin')
);
