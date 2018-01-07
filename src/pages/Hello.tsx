import React, { Component } from 'react';
import './Hello.scss';
import { connect, Dispatch } from "react-redux";
import { doActionA, doActionB } from '../actions/actions';
import { AnyAction } from 'redux';


export interface HelloProps {
    compiler: string;
    framework: string;
    onActionA: any;
    onActionB: any;
}

class Hello extends Component<HelloProps, {}> {
    render(){
        return <div className="hello">
            <h1>Hello from {this.props.compiler} and {this.props.framework} </h1>
            <button onClick={()=> this.props.onActionA(1)}>click</button>
            <button onClick={()=> this.props.onActionB(-1)}>click</button>
        </div>
    }
}

export const mapStateToProps = (state: Object, ownProps: Object) => {
    return {
        ...ownProps,
        ...state
    }
};

export const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    onActionA: (data: number) => dispatch(doActionA(data)),
    onActionB: (data: number) => dispatch(doActionB(data))
});

export const HelloPage = connect(mapStateToProps, mapDispatchToProps)(Hello);
