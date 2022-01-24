// *** Imports for convinient live editing *** //
import { wapTemplate_1 } from "../templates/wap/wap-template-1";
import { wapTemplate_2 } from "../templates/wap/wap-template-2";
import { wapTemplate_3 } from "../templates/wap/wap-template-3";
import { wapTemplate_4 } from "../templates/wap/wap-template-4";


const initialState = {
    wap: wapTemplate_4,
    wapHistory: []
    // wap: wapTemplate_2
}


export function wapReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_WAP':
            return newState = { ...state, wap: { ...action.wap } };
        case 'UPDATE_WAP':
            state.wapHistory.push(state.wap)
            return newState = { ...state, wap: { ...action.wap }, wapHistory: [...state.wapHistory] };
        case 'UNDO_WAP':
            return newState = { ...state, wap: { ...action.wap }, wapHistory: [...action.wapHistory] };
        default:
            return newState;
    }
}