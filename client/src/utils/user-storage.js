import { LocalStorage } from './local-storage';
import { jwtDecode } from 'jwt-decode';

export class UserStorage {
  constructor() {
    this.localStorage = new LocalStorage('userToken');
  }

  save(token) {
    this.localStorage.save(token);
  }

  get isLoggedIn() {
    return !!this.localStorage.current
  }

  get currentToken() {
    return this.localStorage.current;
  }

  get currentUser() {
    return this.currentToken ? jwtDecode(this.currentToken) : undefined;
  }

  delete() {
    this.localStorage.delete();
  }
}
