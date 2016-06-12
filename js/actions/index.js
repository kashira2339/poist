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

export function resizePoist(id, w, h) {
  return { type: RESIZE_POIST, id, w, h };
}

export function movePoist(id, x, y) {
  return { type: MOVE_POIST, id, x, y };
}

export function addPoist(x = 10, y = 10) {
  return { type: ADD_POIST, x, y };
}

export function removePoist(id) {
  return { type: REMOVE_POIST, id };
}

export function editPoist(id, value) {
  return { type: EDIT_POIST, id, value };
}

export function togglePoistEditor(id) {
  return { type: TOGGLE_POIST_EDITOR, id };
}

export function save() {
  return { type: SAVE };
}

export function load() {
  return { type: LOAD };
}
