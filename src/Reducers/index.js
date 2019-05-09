import { combineReducers } from "redux";
import vocabulary from "./vocabulary";
import DataSize from "./size";
const appReducers = combineReducers({
  vocabulary,
  DataSize
});

export default appReducers;
