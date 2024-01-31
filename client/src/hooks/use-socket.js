import { useEffect } from 'react';
import { socket } from '../services/socket';

export function useSocket(event, callback) {
  useEffect(() => {

    socket.connect()
    socket.on(event, callback);

    return () => {
      socket.off(event, callback)
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}