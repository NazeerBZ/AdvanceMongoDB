import React from 'react';
import { Store } from '../store/store.js';
import AuthMiddleware from '../middlewares/authMiddleware.js'
import { connect } from 'react-redux';
import { Link } from 'react-router'

function mapStateToProps(state) {
    return {
        userStatus: state.Authentication.isLogin
    }
}

function mapDispatachToProps(dispatch) {
    return {
        makeMeLogin: (flag) => { Store.dispatch(AuthMiddleware.makeMeLogin(flag)) },
        makeMeLogout: (flag) => { Store.dispatch(AuthMiddleware.makeMeLogout(flag)) },
    }
}


class HomeComp extends React.Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {

    //     }
    // }

    componentWillMount() {
        if (this.props.userStatus === true) {
            this.appRoutes = './counter'
            // console.log('debug')
        }
        else if (this.props.userStatus === false) {
            this.appRoutes = '/'
            // console.log('debug')
        }
    }

    componentWillUpdate(nextProps) {
        // console.log('debug');
        if (nextProps.userStatus === true) {
            this.appRoutes = './counter'
            // console.log('debug')
        }
        else if (nextProps.userStatus === false) {
            this.appRoutes = '/'
            // console.log('debug')
        }
    }

    login() {
        this.props.makeMeLogin(true);
    }

    logout() {
        this.props.makeMeLogout(false);
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

    render() {
        return (
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to={{ pathname: '/' }}>Home</Link></li>
                        <li><Link to={{ pathname: this.appRoutes }}>Counter</Link></li>
                        {/*{console.log(this.appRoutes)}*/}
                    </ul>
                </nav>
                <br />
                <form action="">
                    <input type="email" name='email'  />
                    <input type="password" name='password'  />
                    {this.authButton()}
                </form>
                <br /><br />

                <h1>This is Home Page</h1>
            </div>
        );
    }
}

export const Home = connect(mapStateToProps, mapDispatachToProps)(HomeComp);
