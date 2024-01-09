export class LocalStorage {
  constructor(key) {
    this.key = key;
  }

  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  get current() {
    const dataString = localStorage.getItem(this.key);
    return dataString ? JSON.parse(dataString) : undefined;
  }

  delete() {
    localStorage.removeItem(this.key);
  }
}
