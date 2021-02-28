import { useReducer, useRef, useEffect } from 'react';
// Based on https://github.com/ooade/use-fetch-hook

const RS = {
  REQUESTING: 'requesting',
  RESPONDED: 'responded',
  ERROR: 'error',
};

// Reducer function to handle responses and request status
const reducer = (state, action) => {
  const { status, res } = action;
  console.log('reducer called');
  console.log(state);
  console.log(status);
  console.log(res);
  switch (status) {
    case RS.REQUESTING:
      return { ...state, status };
    case RS.RESPONDED:
      return { ...state, status, data: res };
    case RS.ERROR:
      console.log('Error case, passing:');
      console.log(res);
      console.log({ ...state, status, error: res });
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
  console.log('state is');
  const [state, dispatch] = useReducer(reducer, initState);
  console.log(state);

  // When the component is mounted, invoke fetch call
  useEffect(() => {
    console.log('useEffect loaded');
    let cancelRequest = false;
    if (!url) return;

    // Declare fetch request function proper
    const reqData = async () => {
      // Set status to 'requesting'. Will change when response is received
      dispatch({ status: RS.REQUESTING });
      // If there is data stored in current for this url
      if (cache.current[url]) {
        console.log('Using cached');
        console.log(cache);
        // Use cached data
        const data = cache.current[url];
        // Pass status and data to reducer to be returned by useAPIRequest
        dispatch({ status: RS.RESPONDED, res: data });
      } else {
        try {
          console.log(`Making fetch request to ${url}`);
          const res = await fetch(url, options);
          if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
          const data = await res.json();
          cache.current[url] = data;
          // If component was unmounted while awaiting response, return
          if (cancelRequest) return;
          // Pass fetched data and status to reducer
          dispatch({ status: RS.RESPONDED, res: data });
        } catch (error) {
          console.log(`There was an error with message: '${error.message}'`);
          // If component was unmounted while awaiting response, return
          if (cancelRequest) return;
          console.log(`Will dispatch with error: ${error.message}`);
          dispatch({ status: RS.ERROR, res: error.message });
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
  console.log('will return:');
  console.log(state);
  return state;
};

export default useAPIRequest;
