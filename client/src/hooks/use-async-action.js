import { useCallback, useEffect, useRef, useState } from 'react';

export function useAsyncAction(action) {
  const [state, setState] = useState({
    data: undefined,
    loading: false,
    error: undefined,
  });

  const actionRef = useRef(action);
  actionRef.current = action;

  const shouldCancelRef = useRef(false);

  const perform = useCallback(async (...args) => {
    try {
      setState({ data: undefined, error: undefined, loading: true });

      const data = await actionRef.current(...args);
      if (!shouldCancelRef.current) {
        setState({ data, error: undefined, loading: false });
      }

      return data;
    } catch (error) {
      if (!shouldCancelRef.current) {
        setState({ data: undefined, error, loading: false });
      }

      throw error;
    }
  }, []);

  const trigger = useCallback(
    (...args) => {
      perform(...args).catch(() => {
        /* Intentionally empty */
      });
    },
    [perform]
  );

  useEffect(() => {
    shouldCancelRef.current = false;
    return () => {
      shouldCancelRef.current = true;
    };
  }, []);

  return {
    ...state,
    perform,
    trigger,
  };
}
