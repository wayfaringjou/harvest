/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */

import { useEffect, useState } from 'react';

export default function useAPIRetrieve(requestFunction, query, preventFetch = false) {
  const [resourceState, setResourceState] = useState({
    isRetrieving: (!preventFetch),
    isSuccess: false,
    isFailed: false,
    data: null,
    error: null,
  });

  useEffect(async () => {
    let componentUnmounted = false;
    if (preventFetch) {
      setResourceState({ ...resourceState, isRetrieving: false });
      return;
    }
    try {
      setResourceState({ ...resourceState, isRetrieving: true });
      const { data, error } = await requestFunction();
      if (error) throw new Error(data);
      if (componentUnmounted) return;
      setResourceState({
        isRetrieving: false,
        isSucces: true,
        isFailed: false,
        error: null,
        data,
      });
    } catch (error) {
      if (componentUnmounted) return;
      setResourceState({
        isRetrieving: false,
        isSuccess: false,
        isFailed: true,
        data: null,
        error,
      });
    }
    return () => componentUnmounted = true;
  }, [query]);

  return resourceState;
}
