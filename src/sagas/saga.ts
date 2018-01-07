import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import { delay } from 'redux-saga';
import { AnyAction } from 'redux';
import { ActionA, TypeKeys } from '../actions/actions';


function* wait(action: AnyAction) {
    const response = yield call(fetch, '/web_api');
    console.log(response);
    yield put({type: TypeKeys.C, playload: action.playload, res: response})
}

export function* watchWait() {
    yield takeEvery(TypeKeys.A, wait);
}

export default function* root() {
    yield all([
        fork(watchWait)
    ])
}

