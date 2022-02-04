const initialState = {
   currElement: null,
   boardSize: 'desktop'
}


export function editorReducer(state = initialState, action) {

   switch (action.type) {

      case 'SET_CURR_ELEMENT':
         return { ...state, currElement: { ...action.element } };

      case 'UPDATE_CURR_ELEMENT':
         return { ...state, currElement: { ...action.updatedElement } };

      case 'SET_BOARD_SIZE':
         return { ...state, boardSize: action.boardSize }

      default:
         return state
   }
}
