/*
    global
    document: false
*/ 
import React from 'react';
import ReactDOM from 'react-dom';

/* eslint-disable */ 
import 'styles/app.less';
import 'styles/modifyAntd.less'
/* eslint-enable */ 

import { App } from './container';

ReactDOM.render(
    <App />,
    document.querySelector('.example')
);
