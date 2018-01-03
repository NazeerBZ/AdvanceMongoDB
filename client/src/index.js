import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app.js';
import { Home } from './components/home.js';
import { Increament } from './components/increament.js';
import RequireAuth from './components/require_authentication.js';

import { Provider } from 'react-redux';
import { Store } from './store/store.js';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
    <Provider store={Store}>
        <Router history={browserHistory}>
            <Route path='/' component={App} >
                <IndexRoute component={Home} />
                <Route path='./counter' component={Increament} />
            </Route>
        </Router>
    </Provider>
    , document.getElementById("root"));

