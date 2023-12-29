import { createContext, useContext, useState } from 'react';
import { UserStorage } from '../utils/user-storage';
import { useEventBus } from './useEventBus';

const CurrentUserContext = createContext(undefined);

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export function CurrentUserContextProvider({ children }) {
  const userStorage = new UserStorage();
  const [user, setUser] = useState(userStorage.currentUser);

  useEventBus('login', setUser);
  useEventBus('logout', () => setUser(undefined));

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
}
