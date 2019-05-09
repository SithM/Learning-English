import * as Types from "./../constants/ActionTypes";
var initialState = [];

var findIndex = (voc, id) => {
  // console.log(id);
  var result = -1;
  voc.forEach((v, index) => {
    if (v.id === id) {
      result = index;
    }
  });
  return result;
};

const vocabulary = (state = initialState, action) => {
  let index = -1;
  let { vocabulary, id } = action;
  switch (action.type) {
    case Types.LIST_VOCABULARY:
      state = action.vocabulary;
      return [...state];

    case Types.CHANGE_MEMORIZED:
      index = findIndex(state, vocabulary.id);
      state[index] = vocabulary;
      return [...state];

    case Types.CHANGE_VN:
      index = findIndex(state, vocabulary.id);
      state[index] = vocabulary;
      return [...state];

    case Types.DELETE_WORD:
      index = findIndex(state, id);
      // console.log(index);
      state.splice(index, 1);
      return [...state];

    case Types.ADD_WORD:
      state.push(action.vocabulary);
      return [...state];

    default:
      return [...state];
  }
};

export default vocabulary;
