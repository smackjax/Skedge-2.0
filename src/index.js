import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'; 

import {Provider} from 'react-redux';
import REDUXSTORE from './_redux/redux-store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';



// Icons
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render((
    <Provider store={REDUXSTORE}>
        <Router>
            <App />
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
