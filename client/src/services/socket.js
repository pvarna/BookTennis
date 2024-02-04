import { io } from 'socket.io-client';
import { config } from '../config';
import { UserStorage } from '../utils/user-storage';

const userStorage = new UserStorage();

export const socket = io(config.serverBaseUrl, {
  autoConnect: true,
  extraHeaders: {
    'Content-Type': 'application/json',
    ...(userStorage.isLoggedIn
      ? { Authorization: `Bearer ${userStorage.currentToken}` }
      : {}),
  },
});
