import { Action } from 'redux';
export enum TypeKeys {
    A = 'app_action_a',
    B = 'app_action_b',
    C = 'app_action_c',
    D = 'app_action_d'
}

export interface ActionA extends Action {
    type: TypeKeys.A;
    playload: Object;
}

export interface ActionB extends Action {
    type: TypeKeys.B;
    playload: Object;
}

export const doActionA = (data: number): ActionA => ({
    type: TypeKeys.A,
    playload: {data}
});

export const doActionB = (data: number): ActionB => ({
    type: TypeKeys.B,
    playload: {data}
});
