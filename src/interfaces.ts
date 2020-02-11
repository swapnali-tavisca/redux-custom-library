export interface IImmutableObject {
  get: (path: string, defaultValue?: any) => any;
  getIn: (path: string[]) => any;
  set: (path: string, value: any) => void;
  setIn: (path: string[], value: any) => void;
  toJS: () => any;
  toArray: () => any[];
  last: () => any;
  filter: (cb: Function) => any;
  findLast: (cb: Function) => any;
  has: (key: string) => boolean;
}

export interface IReduxStore {
  dashboard?: IImmutableObject;
  models: IImmutableObject;
  forms?: IImmutableObject;
  login?: IImmutableObject;
}

export interface IAction {
  type: string;
}

export interface IThunkAction {
  type: string;
  (dispatch: any, getState: () => IReduxStore, extraArgument: {}): {};
}

export interface ISelectOptions {
  label: string;
  value: string;
}

export interface Theme {
  name: string;
  properties: any;
}
