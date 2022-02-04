const initialState = {
    wap: null,
    wapHistory: []
}


export function wapReducer(state = initialState, action) {

    switch (action.type) {

        case 'SET_WAP':
            return { ...state, wap: { ...action.wap }, wapHistory: [] };

        case 'UPDATE_WAP':
            const prevWap = JSON.parse(JSON.stringify(state.wap))
            return { ...state, wap: { ...action.wap }, wapHistory: [...state.wapHistory, prevWap] };

        case 'UNDO_WAP':
            return { ...state, wap: { ...action.wap }, wapHistory: [...action.wapHistory] };

        default:
            return state;
    }
}


