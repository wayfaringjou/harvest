import { useReducer, useRef, useEffect } from 'react';
// Based on https://github.com/ooade/use-fetch-hook

const RS = {
  REQUESTING: 'requesting',
  RESPONDED: 'responded',
  ERROR: 'error',
};

// Reducer function to handle responses and request status
const reducer = (state, status, res = {}) => {
  switch (status) {
    case RS.REQUESTING:
      return { ...state, status };
    case RS.RESPONDED:
      return { ...state, status, data: res };
    case RS.ERROR:
      return { ...state, status, error: res };
    default:
      return state;
  }
};

const useAPIRequest = (url, options) => {
  // useRef will hold value in .current while component is mounted
  const cache = useRef({});

  const initState = {
    status: 'idle',
    error: null,
    data: [],
  };

  const [state, dispatch] = useReducer(reducer, initState);

  // When the component is mounted, invoke fetch call
  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    // Declare fetch request function proper
    const reqData = async () => {
      // Set status to 'requesting'. Will change when response is received
      dispatch({ type: RS.REQUESTING });
      // If there is data stored in current for this url
      if (cache.current[url]) {
        // Use cached data
        const data = cache.current[url];
        // Pass status and data to reducer to be returned by useAPIRequest
        dispatch({ type: RS.RESPONDED, res: data });
      } else {
        try {
          console.log(`Making fetch request to ${url}`);
          const response = await fetch(url, options);
          const data = await response.json();
          cache.current[url] = data;
          // If component was unmounted while awaiting response, return
          if (cancelRequest) return;
          // Pass fetched data and status to reducer
          dispatch({ type: RS.RESPONDED, res: data });
        } catch (error) {
          // If component was unmounted while awaiting response, return
          if (cancelRequest) return;
          dispatch({ type: RS.ERROR, res: error.message });
        }
      }
    };

    // Call request function
    reqData();

    // A function returned by useEffect is used for cleanup by react
    // eslint-disable-next-line consistent-return
    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  // Return state with status and response data
  return state;
};

export default useAPIRequest;
