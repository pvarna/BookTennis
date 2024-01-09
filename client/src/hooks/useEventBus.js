import { useEffect, useRef } from 'react';
import EventEmitter from 'eventemitter3';

export const EventBus = new EventEmitter();

export function useEventBus(event, callback) {
  const actionCallback = useRef(callback);
  actionCallback.current = callback;

  useEffect(() => {
    const handler = (...args) => actionCallback.current(...args);

    EventBus.on(event, handler);
    return () => {
      EventBus.removeListener(event, handler);
    };
  }, [event]);
}
