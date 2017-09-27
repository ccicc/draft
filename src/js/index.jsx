/*
    global
    document: false
*/
import React from 'react';
import ReactDOM from 'react-dom';

import 'styles/app.less';   // eslint-disable-line
import 'styles/modifyAntd.less' // eslint-disable-line

import { App } from './container';

ReactDOM.render(
  <App />,
  document.querySelector('.example')
);
