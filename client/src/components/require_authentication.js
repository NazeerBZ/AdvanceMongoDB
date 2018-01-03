import React from 'react';
import { connect } from 'react-redux';

export default function RequireAuth(ComposedComponenet) {

    class Authentication extends React.Component {
        render() {
            console.log(this.props.userStatus)
            return (
                <ComposedComponenet {...this.props} />
            )
        }
    }

    function mapStateToProps(state) {
        return {
            userStatus: state.Authentication.isLogin
        }
    }

    return connect(mapStateToProps)(Authentication);
}
