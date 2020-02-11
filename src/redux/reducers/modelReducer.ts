import { OrderedMap } from "immutable";
import {
  SAVE_INSTANCE,
  REMOVE_INSTANCE,
  UPDATE_INSTANCE,
  SAVE_INSTANCE_ARRAY,
  REMOVE_INSTANCE_FROM_ARRAY,
  UPDATE_INSTANCE_FROM_ARRAY
} from "../actions/actionConstant";

/**
 * Reducer to store the model instances.
 * @export
 * @param {*} [state=OrderedMap({})]
 * @param {*} action
 * @returns
 */
export function modelReducer(state = OrderedMap({}), action: any) {
  switch (action.type) {
    case SAVE_INSTANCE:
      return state.set(action.key, action.instance);

    case UPDATE_INSTANCE:
      return state.set(action.key, action.instance);

    case REMOVE_INSTANCE:
      return state.delete(action.key);

    //-------Bulk data Functions

    case SAVE_INSTANCE_ARRAY:
      let objProps = state.getIn([action.identifier, "props"]);
      if (objProps && Object.values(objProps).length > 0) {
        return state.setIn(
          [action.identifier, "props"],
          OrderedMap({
            ...objProps.toJS(),
            ...action.instance
          })
        );
      } else {
        return state.set(
          action.identifier,
          OrderedMap({
            props: OrderedMap({ ...action.instance }),
            resource: action.identifier
          })
        );
      }

    case UPDATE_INSTANCE_FROM_ARRAY:
      return state.setIn(
        [action.instance.resource, "props", action.identifier],
        action.instance
      );

    case REMOVE_INSTANCE_FROM_ARRAY:
      return state.deleteIn([
        action.instance.resource,
        "props",
        action.identifier
      ]);

    default:
      return state;
  }
}
