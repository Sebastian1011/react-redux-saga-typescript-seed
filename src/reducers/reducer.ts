import { TypeKeys } from "../actions/actions";
import { AnyAction } from 'redux';

interface INIT_STATE {
    count: number
}
const defaultState = {
    count: 0
};

const helloReducer = (state:INIT_STATE = defaultState , action: AnyAction): INIT_STATE => {
    switch (action.type) {
        case TypeKeys.C: {
            console.log(action)
            const newState = { count: state.count + action.playload.data};
            console.log(newState);
            return newState;
        }
        case TypeKeys.D: {
            console.log(action)
            const newState = { count: state.count + action.playload.data};
            console.log(newState);
            return newState;
        }
        default:
            return state;
    }
}
export default helloReducer;
