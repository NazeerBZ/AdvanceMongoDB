import React from 'react';
import { Store } from '../store/store.js';
import CounterMiddleware from '../middlewares/counterMiddleware.js';
import AuthMiddleware from '../middlewares/authMiddleware.js'
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

function mapStateToComp(state) {
    return {
        increasedValue: state.CounterReducer,
        userStatus: state.Authentication.isLogin
    }
}

function mapDispatachToComp(dispatch) {
    return {
        increaseByOne: (val) => { Store.dispatch(CounterMiddleware.increament(val)) },
        makeMeLogin: (flag) => { Store.dispatch(AuthMiddleware.makeMeLogin(flag)) },
        makeMeLogout: (flag) => { Store.dispatch(AuthMiddleware.makeMeLogout(flag)) }
    }
}

class IncreamentComp extends React.Component {

    login() {
        this.props.makeMeLogin(true);
    }

    logout() {
        this.props.makeMeLogout(false);
        browserHistory.push('/');
    }

    authButton() {

        if (this.props.userStatus === true) {
            // console.log(this.props.userStatus);
            return <button onClick={this.logout.bind(this)}>Logout</button>

        }
        else if (this.props.userStatus === false) {
            // console.log(this.props.userStatus)
            return <button onClick={this.login.bind(this)}>login</button>
        }
    }

    increamention() {
        this.props.increaseByOne(1);
    }

    render() {
        return (
            <div className="App">
                <h1>{this.props.increasedValue.adding}</h1>
                <button onClick={this.increamention.bind(this)}>Increase</button>
                <br /><br />
                {this.authButton()}
                <br /><br />
                <Link to={{ pathname: '/' }}>Return To Home</Link>
            </div>
        );
    }
}

export const Increament = connect(mapStateToComp, mapDispatachToComp)(IncreamentComp);
