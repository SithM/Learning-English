import * as Types from "./../constants/ActionTypes";
import callApi from "./../utils/apiCaller";

export const GetAllVocabularyRequest = (page, type) => {
  // console.log(type);
  return async dispatch => {
    const res = await callApi(
      `vocabulary${
        type !== "all" ? `?isMemorized=${type}&` : "?&"
      }_page=${page}&_limit=5`,
      "GET",
      null
    );
    // const total_pages = await callApi("vocabulary", "GET", null);
    // console.log(total_pages.data.length);
    dispatch(actGetAllVocabulary(res.data));
  };
};

export const actGetAllVocabulary = vocabulary => {
  return {
    type: Types.LIST_VOCABULARY,
    vocabulary
  };
};

export const GetSizeRequest = type => {
  // console.log(type);
  return async dispatch => {
    const res = await callApi(
      `vocabulary${type !== "all" ? `?isMemorized=${type}&` : ""}`,
      "GET",
      null
    );
    // const total_pages = await callApi("vocabulary", "GET", null);
    // console.log("length ", type);
    dispatch(actGetSize(res.data.length));
  };
};

export const actGetSize = size => {
  return {
    type: Types.GET_SIZE,
    size
  };
};

export const ChangeMemorizedRequest = data => {
  //console.log(data);
  return dispatch => {
    return callApi(`vocabulary/${data.id}`, "PUT", data).then(res => {
      //console.log(res);
      dispatch(actChangeMemorized(res.data));
    });
  };
};

export const actChangeMemorized = vocabulary => {
  return {
    type: Types.CHANGE_MEMORIZED,
    vocabulary
  };
};

export const ChangeVNRequest = data => {
  //console.log(data);
  return dispatch => {
    return callApi(`vocabulary/${data.id}`, "PUT", data).then(res => {
      //console.log(res);
      dispatch(actChangeVN(res.data));
    });
  };
};

export const actChangeVN = vocabulary => {
  return {
    type: Types.CHANGE_VN,
    vocabulary
  };
};

export const DeleteWordRequest = id => {
  // console.log(id);
  return dispatch => {
    return callApi(`vocabulary/${id}`, "DELETE", null).then(res => {
      //console.log(res);
      dispatch(actDeleteWord(id));
    });
  };
};

export const actDeleteWord = id => {
  return {
    type: Types.DELETE_WORD,
    id
  };
};

export const AddWordRequest = word => {
  // console.log(id);
  return dispatch => {
    return callApi(`vocabulary`, "POST", word).then(res => {
      //console.log(res);
      dispatch(actAddWord(res.data));
    });
  };
};

export const actAddWord = vocabulary => {
  return {
    type: Types.ADD_WORD,
    vocabulary
  };
};
