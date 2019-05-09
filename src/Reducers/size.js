import * as Types from "./../constants/ActionTypes";
var initialState = 0;

const DataSize = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_SIZE:
      state = action.size;
      return state;
    default:
      return state;
  }
};

export default DataSize;
