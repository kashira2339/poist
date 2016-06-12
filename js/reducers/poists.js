import {
  ADD_POIST,
  REMOVE_POIST,
  MOVE_POIST,
  RESIZE_POIST,
  EDIT_POIST,
  TOGGLE_POIST_EDITOR,
  SAVE,
  LOAD
} from '../constants/ActionTypes';

import { POIST_LOCALSTORAGE_KEY } from '../constants/Storage';

const initialState = [
  { 
    id: 0,
    value: 'poists on redux',
    showEditor: false,
    x: 0,
    y: 0,
    width: 240,
    height: 160
  }
];

const reducer = {
  [ADD_POIST](action) {
    return [
      ...this.state,
      { 
        id: this.state.reduce((maxId, poist) => Math.max(poist.id, maxId), -1) +1,
        value: '',
        showEditor: false,
        x: action.x,
        y: action.y,
        width: 240,
        height: 160
      }
    ];
  },
  [REMOVE_POIST](action) {
    return this.state.filter(poist => poist.id !== action.id);
  },
  [MOVE_POIST](action) {
    return this.state.map(
      poist =>
        poist.id === action.id ?
        Object.assign({}, poist, { x : action.x, y: action.y }) : poist
    );
  },
  [RESIZE_POIST](action) {
    return this.state.map(
      poist =>
        poist.id === action.id ?
        Object.assign({}, poist, { width : action.w, height: action.h }) : poist
    );
  },
  [EDIT_POIST](action) {
    return this.state.map(
      poist =>
        poist.id === action.id ?
        Object.assign({}, poist, { value : action.value }) : poist
    );
  },
  [TOGGLE_POIST_EDITOR](action) {
    return this.state.map(
      poist =>
        poist.id === action.id ?
        Object.assign({}, poist, { showEditor : !poist.showEditor }) : poist
    );
  },
  [SAVE](action) {
    window.localStorage.setItem(POIST_LOCALSTORAGE_KEY, JSON.stringify(this.state));
    return this.state;
  },
  [LOAD](action) {
    const JSONlocalPoists = window.localStorage.getItem(POIST_LOCALSTORAGE_KEY);
    if (!JSONlocalPoists) {
      return this.state;
    }
    const localPoists = JSON.parse(JSONlocalPoists);
    return !!localPoists ? localPoists : this.state;
  }
};

export default function poists(state = initialState, action){
  const act = reducer[action.type];
  return !!act ? act.call({ state }, action) : state;
}
