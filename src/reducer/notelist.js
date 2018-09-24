export const EDIT_NOTE = 'EDIT_NOTES';
export const DELETE_NOTE = 'DELETE_NOTE';
export const ADD_NOTE = 'ADD_NOTE';

export default function reducer(state = { list: [] }, action) {
  switch (action.type) {
    case EDIT_NOTE:
        var { index, noteObject } = action;
        var list = state.list;
        list[index] = noteObject;
      return { ...state, list};
    case DELETE_NOTE:
        var { index } = action;
        var list = state.list;
        var afterDeleteList = list.splice(index, 1);
        console.log('afterDeleteList ',afterDeleteList);
      return { ...state, list: afterDeleteList};
    case ADD_NOTE:
        var { noteObject } = action;
        console.log('ADD_NOTE noteObject ',noteObject);
        var list = state.list;
        list.push(noteObject);
      return {
        ...state,
        list
      };
    default:
      return state;
  }
}