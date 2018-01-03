
export default class ActionBundle {

    static counter(val) {
        return {
            type: 'COUNTER',
            counterValue: val
        }
    }

    static UserLog(flag) {
        return {
             type: 'USERLOG',
             userFlag: flag
        }
    }

}