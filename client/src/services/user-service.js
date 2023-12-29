import { EventBus } from '../hooks/useEventBus';
import { UserStorage } from '../utils/user-storage';
import { HttpService } from './http-service';

class UserService {
  constructor() {
    this.httpService = new HttpService();
    this.userStorage = new UserStorage();
  }

  async login(userDetails) {
    const data = await this.httpService.post('/user/login', {
      body: { ...userDetails },
    });

    this.userStorage.save(data.token);
    if (this.userStorage.currentUser) {
      EventBus.emit('login', this.userStorage.currentUser);
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
    EventBus.emit('logout');
  }
}

export const userService = new UserService();
