import { useEffect } from 'react';
import { useAsyncAction } from './use-async-action';

export function useAsync(action, dependencies) {
  const { data, loading, error, trigger, cancel } = useAsyncAction(action);

  useEffect(() => {
    trigger();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, ...dependencies]);

  return { data, loading, error, reload: trigger, cancel };
}
