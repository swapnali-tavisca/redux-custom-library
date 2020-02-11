import { combineReducers } from "redux";
import { IReduxStore } from "../../interfaces";
import { modelReducer } from "./modelReducer";

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<IReduxStore>({
  models: modelReducer as any
});
