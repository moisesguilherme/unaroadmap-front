import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';
import { hot, setConfig } from 'react-hot-loader'

setConfig({
    showReactDomPatchNotification: false
})

import App from './components/App';

render(
    <App />,
    document.querySelector('#root')
);