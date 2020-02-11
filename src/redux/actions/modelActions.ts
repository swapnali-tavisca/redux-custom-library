import {
  REMOVE_INSTANCE,
  SAVE_INSTANCE,
  UPDATE_INSTANCE,
  SAVE_INSTANCE_ARRAY,
  UPDATE_INSTANCE_FROM_ARRAY,
  REMOVE_INSTANCE_FROM_ARRAY
} from "./actionConstant";
import { BaseModel } from "../../index";
import { store } from "../../index";
import { IThunkAction, IAction } from "../../interfaces";

export function dispatch<T extends IAction>(action: T | IThunkAction) {
  if ((action as IAction).type) {
    return store.dispatch(action as IAction);
  }
  return store.dispatch<{ type: string }>(action as IThunkAction);
}
/**
 *action to save the BaseModel instance.
 * @param {BaseModel<{}>} instance
 * @param {string} key
 * @param {string} identifier
 */
export function saveInstance(
  instance: BaseModel<{}>,
  key: string,
  identifier: string
) {
  return dispatch({
    type: SAVE_INSTANCE,
    instance,
    key
  });
}

/**
 *action to delete the instance
 * @param {string} key
 */
export function removeInstance(key: string) {
  return dispatch({
    type: REMOVE_INSTANCE,
    key
  });
}

/**
 *action to update a single BaseModel instance.
 * @param {string} key
 * @param {*} instance
 */
export function updateInstance(key: string, instance: any) {
  return dispatch({
    type: UPDATE_INSTANCE,
    key,
    instance
  });
}

export function saveInstanceArray(instance: BaseModel<{}>, identifier: string) {
  return dispatch({
    type: SAVE_INSTANCE_ARRAY,
    identifier,
    instance
  });
}

export function updateInstanceArray(
  identifier: string,
  instance: BaseModel<{}>
) {
  return dispatch({
    type: UPDATE_INSTANCE_FROM_ARRAY,
    identifier,
    instance
  });
}

export function removeInstanceArray(
  identifier: string,
  instance: BaseModel<{}>
) {
  return dispatch({
    type: REMOVE_INSTANCE_FROM_ARRAY,
    identifier,
    instance
  });
}
