import { createContext, useContext, useState } from 'react';
import { UserStorage } from '../utils/user-storage';
import { useEventBus } from './useEventBus';
import { EVENTS } from '../constants';
import { useAsyncAction } from './use-async-action';
import { userService } from '../services/user-service';

const CurrentUserContext = createContext(undefined);

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export function CurrentUserContextProvider({ children }) {
  const userStorage = new UserStorage();
  const [user, setUser] = useState(userStorage.currentUser);

  const { trigger: onLogout } = useAsyncAction(async () => {
    
    await userService.deleteSession();
    setUser(undefined);
  });

  useEventBus(EVENTS.login, setUser);
  useEventBus(EVENTS.logout, onLogout);

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
}
