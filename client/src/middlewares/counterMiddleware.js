import ActionBundle from '../actions/actionbundle.js';

export default class CounterMiddleware {

    static increament(val) {
        return (dispatch) => {

            dispatch(ActionBundle.counter(val));
        }
    }

}