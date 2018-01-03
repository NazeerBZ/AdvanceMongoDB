const INTIAL_STATE = {
    adding: 0
}

export default function CounterReducer(state = INTIAL_STATE, action) {

    switch (action.type) {

        case 'COUNTER':
            var temp = state.adding + action.counterValue;
            return Object.assign({}, state, { adding: temp })

        default:
            return state
    }
}

