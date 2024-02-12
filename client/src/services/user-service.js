import { EVENTS } from '../constants';
import { EventBus } from '../hooks/useEventBus';
import { UserStorage } from '../utils/user-storage';
import { HttpService } from './http-service';

class UserService {
  constructor() {
    this.httpService = new HttpService();
    this.userStorage = new UserStorage();
  }

  async loadUser(id) {
    const { user } = await this.httpService.get(`/user/${id}`);

    return user;
  }

  async updateUserInfo(id, userInfo) {
    await this.httpService.put(`/user/${id}`, {
      body: { userInfo },
    });
  }

  async login(userDetails) {
    const data = await this.httpService.post('/user/login', {
      body: { ...userDetails },
    });

    this.userStorage.save(data.token);
    if (this.userStorage.currentUser) {
      EventBus.emit(EVENTS.login, this.userStorage.currentUser);
    }
  }

  async register(userDetails) {
    const data = await this.httpService.post('user/register', {
      body: { ...userDetails },
    });

    return data.user;
  }

  logout() {
    this.userStorage.delete();
    EventBus.emit(EVENTS.logout);
  }

  async loadAllUsers(){
    const data = await this.httpService.get('/user/');

    return data;
  }
}

export const userService = new UserService();
