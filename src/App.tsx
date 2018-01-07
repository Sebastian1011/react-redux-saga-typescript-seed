import React, { Component } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { HelloPage } from './pages/Hello';
import {createStore, combineReducers, applyMiddleware} from "redux";
import helloReducer  from "./reducers/reducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga  from './sagas/saga';


const sagaMiddleWare = createSagaMiddleware();
const store = createStore(combineReducers({helloReducer}), applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);
export class App extends Component<{},{}> {
    render(){
        return <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route exact path="/" render={()=> (
                        <HelloPage compiler={"typescript"} framework={"react"}/>
                    )}/>
                    <Route path="/hello" render={()=> (
                        <HelloPage compiler={"hehehe"} framework={"hehehehe"}/>
                    )}/>
                </Switch>
            </HashRouter>
        </Provider>
    }
}
