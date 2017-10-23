/*
    global
    document: false
*/
import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';

import 'styles/app.less';   // eslint-disable-line
import 'styles/modifyAntd.less' // eslint-disable-line
import 'styles/Draft.css'; // eslint-disable-line
import 'moment/locale/zh-cn';
import { App } from './container';

moment.locale('zh-cn');

ReactDOM.render(
  <App />,
  document.querySelector('.example')
);
