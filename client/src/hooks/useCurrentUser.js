import { createContext, useContext, useState } from 'react';
import { UserStorage } from '../utils/user-storage';
import { useEventBus } from './useEventBus';
import { EVENTS } from '../constants';

const CurrentUserContext = createContext(undefined);

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export function CurrentUserContextProvider({ children }) {
  const userStorage = new UserStorage();
  const [user, setUser] = useState(userStorage.currentUser);

  useEventBus(EVENTS.login, setUser);
  useEventBus(EVENTS.logout, () => setUser(undefined));

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
}
