import ActionBundle from '../actions/actionbundle.js';

export default class AuthMiddleware {

    static makeMeLogin(flag) {
        return (dispatch) => {
            dispatch(ActionBundle.UserLog(flag))
        }
    }

    static makeMeLogout(flag) {
        return (dispatch) => {
            dispatch(ActionBundle.UserLog(flag));
        }
    }
}