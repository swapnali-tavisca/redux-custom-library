import {
  removeInstance,
  saveInstance,
  updateInstance,
  saveInstanceArray,
  updateInstanceArray,
  removeInstanceArray
} from "../actions/modelActions";
import { store } from "../store/index";

/**
 * Utility Model to save the instances for different models.
 * @export
 * @class BaseModel
 * @template P
 */
export class BaseModel<P> {
  static resource: string;
  resource: string;
  static constraint: any;
  static defaultProps: any;

  constructor(public props: P & { id: number | string }) {
    this.resource = this.constructor["resource"];
    this.props = props;
  }

  /**
   * Returns the concatination of resource name and id.
   * @param {*} [id]
   * @returns {string}
   * @memberof BaseModel
   */
  getStoreKey(id?: any): string {
    return `${this.resource}${id || this.props.id}`;
  }

  /**
   * Creates a new instance for the model which it is called.
   * @returns {BaseModel<P>}
   * @memberof BaseModel
   */
  $save(): BaseModel<P> {
    saveInstance(this, this.getStoreKey(), this.resource);
    return this;
  }

  /**
   * Updates the instance using the key for the model it is called with new props.
   * @param {string} [key='']
   * @returns {BaseModel<P>}
   * @memberof BaseModel
   */
  $update(id: string = ""): BaseModel<P> {
    updateInstance(
      `${id ? `${this.resource}${id}` : this.getStoreKey()}`,
      this
    );
    return this;
  }

  /**
   * Saves all the model instances passed to the function using for loop iteration.
   * @static
   * @template T
   * @param {T[]} instances
   * @memberof BaseModel
   */
  static saveAll<T extends BaseModel<{}>>(instances: T[]): void {
    for (let instance of instances) {
      if (!validateObject(instance, this["constraints"])) {
        throw Error;
      }
    }
    instances.map(instance => {
      saveInstance(instance, instance.getStoreKey(), instance.resource);
    });
  }

  /**
   * Removes the instance from the store for the passed id
   * @param {string} id
   * @memberof BaseModel
   */
  $delete(id: string): void {
    removeInstance(this.getStoreKey(id));
  }

  /**
   * Returns a single instance using the id passed by user.
   * @static
   * @param {string} id
   * @param {*} [state=store.getState()]
   * @returns
   * @memberof BaseModel
   */
  static get(id: string, state = store.getState()) {
    let modelState = state.models;
    if (!modelState) {
      return;
    }
    let storeKey: string = `${this.resource}${id}`;
    return modelState.toJS ? modelState.get(storeKey) : modelState[storeKey];
  }

  /**
   * Returns a array of instance matching the particular resource name.
   * @static
   * @param {*} [state=store.getState()]
   * @returns
   * @memberof BaseModel
   */
  static list(state = store.getState()) {
    return state.models
      .filter((instance: any) => {
        return instance.resource === this.resource;
      })
      .toArray();
  }

  /**
   * Deletes all the instance for the model it is called.
   * @static
   * @param {*} [instances=this.list()]
   * @memberof BaseModel
   */
  static deleteAll(instances = this.list()) {
    instances.map((instance: any) => removeInstance(instance.getStoreKey()));
  }

  /**
   * A custom base model function to get a single instance from the matching key and value pair in the modal props.
   * @static
   * @param {string} reference
   * @param {string} value
   * @returns
   * @memberof BaseModel
   */
  static getBy(reference: string, value: string) {
    const instances = this.list();
    return instances.find((instance: any) => {
      if (instance.props[reference] === value) {
        return instance;
      }
    });
  }
  // isEmpty Function
  static isEmpty(obj: Object) {
    if (Object.keys(obj).length <= 0 || !obj) {
      return true;
    }
    return false;
  }
  //bulk instances functions

  static saveInstanceArray<T extends BaseModel<{}>>(
    instances: T[],
    indentifier: string
  ): void {
    let instanceObj = arrayToObject(instances, indentifier);
    saveInstanceArray(instanceObj, indentifier);
  }

  static getInsatnce(id: string, state = store.getState()) {
    let modelState = state.models;
    if (!modelState) {
      return;
    }
    let storeKey: string = `${this.resource}${id}`;
    return modelState.toJS ? modelState.get(storeKey) : modelState[storeKey];
  }

  static instancesList(state = store.getState()) {
    let obj = state.models
      .filter((instance: any) => {
        return instance.get("resource") === this.resource;
      })
      .toJS();
    return this.isEmpty(obj) ? [] : Object.values(obj[this.resource].props);
  }

  $updateInstance(id: string = ""): BaseModel<P> {
    updateInstanceArray(`${this.resource}${id}`, this);
    return this;
  }

  $deleteInstance(id: string = ""): BaseModel<P> {
    removeInstanceArray(`${this.resource}${id}`, this);
    return this;
  }
}

function validateObject(obj: Object, rules: Object): boolean {
  for (let prop in rules) {
    if (rules.hasOwnProperty(prop)) {
      let constraint = rules[prop];
      if (!constraint(obj[prop])) {
        return false;
      }
    }
  }
  return true;
}

export const arrayToObject = (array, identifier) => {
  return array.reduce((obj, item) => {
    obj[`${identifier}${item.props.id}`] = item;
    return obj;
  }, {});
};
