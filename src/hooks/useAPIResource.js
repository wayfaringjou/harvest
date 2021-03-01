/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */

import { useEffect, useState } from 'react';

export default function useAPIResource(requestFunction) {
  const [resourceState, setResourceState] = useState({
    isRequesting: true,
    isSuccess: false,
    isFailed: false,
    data: null,
    error: null,
  });

  const refresh = false;
  useEffect(async () => {
    let componentUnmounted = false;
    try {
      const { data, error } = await requestFunction();
      if (error) throw new Error(data);
      if (componentUnmounted) return;
      setResourceState({
        isRequesting: false,
        isSucces: true,
        isFailed: false,
        error: null,
        data,
      });
    } catch (error) {
      if (componentUnmounted) return;
      setResourceState({
        isRequesting: false,
        isSuccess: false,
        isFailed: true,
        data: null,
        error,
      });
    }
    return () => componentUnmounted = true;
  }, [refresh]);

  return resourceState;
}
