import { useEffect, useState } from 'react';

/*
'requestFunction' is an object with a function as property request
i.e. {request: asyncFunction}
'request' is a boolean to trigger useEffect conditionally
'reloadControl' contains a reload boolean and a function to change it's value
*/
export default function useAPISend(
  requestFunction = { request: async () => {} },
  request = false,
  reloadControl = { reload: false, setReload: () => {} },
) {
  // Initialize state
  const [requestState, setRequestState] = useState({
    isSubmitting: false,
    submitSuccess: false,
    submitResponse: null,
    submitError: null,
  });

  // Destructure reloadControl
  const { reload, setReload } = reloadControl;

  // Trigger effect when component mounts and when 'request' changes value
  useEffect(async () => {
    // Prevent running on mount when there is no send request
    if (requestFunction === null) return;

    // Short circuit in case component unmounts while waiting async
    let componentUnmounted = false;

    // Attempt POST, PATCH or DELETE request using methods defined in services
    try {
      // Set isSubmitting state before async call
      setRequestState({ ...requestState, isSubmitting: true });
      // Make async call using function passed in arguments
      const { data, error } = await requestFunction.request();

      setReload(!reload);

      // Handle failure
      if (error) throw new Error(data);

      // Stop operation if component was unmounted by user interaction
      if (componentUnmounted) return;

      // Update request state with success response
      setRequestState({
        isSubmitting: false,
        submitSuccess: true,
        submitError: null,
        submitResponse: data,
      });
      // Trigger reload of component data
    } catch (error) {
      // Stop operation if component was unmounted by user interaction
      if (componentUnmounted) return;

      // Update request state with error response
      setRequestState({
        isSubmitting: false,
        submitSuccess: false,
        submitResponse: null,
        submitError: error.message,
      });
    }
    // useEffect uses a returned function as cleanup when component unmounts
    // eslint-disable-next-line consistent-return
    return () => {
      componentUnmounted = true;
    };
  }, [request]);

  return { requestState, setRequestState };
}
