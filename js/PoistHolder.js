import { LOCAL_STORAGE_KEY } from './Const';

const storage = window.localStorage;

export default class PoistHolder {

  constructor() {
    this.poistList = this.load();
  }

  add(poist) {
    this.poistList.push(poist);
  }

  save() {
    const data = storage.getItem(LOCAL_STORAGE_KEY) || {};
    data[window.location.href] = JSON.stringify(this.poistList);
    storage.setItem(LOCAL_STORAGE_KEY, data);
  }

  load() {
    const data = storage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return [];
    this.poistList = JSON.parse(data[window.location.href]) || [];
    return this.poistList;
  }

  import() {
  }

  export() {
  }
}
