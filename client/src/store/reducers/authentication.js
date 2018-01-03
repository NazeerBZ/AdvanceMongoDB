
const INITIAL_VALUE = {
    isLogin: false
}

export default function Authentication(state = INITIAL_VALUE, action) {

    switch (action.type) {

        case 'USERLOG':
            return Object.assign({}, state, { isLogin: action.userFlag })

        default:
            return state
    }
}