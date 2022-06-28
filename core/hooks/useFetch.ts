import { useState } from 'react';

type TUseFetch = {
  isLoading: boolean,
  fetch: (
    service: any,
    data: any,
    success?: ((result: any) => void) | undefined,
    failure?: ((result: any) => void) | undefined,
  ) => void,
  errorCode: string,
  errorMessage: string,
  clearError: () => void,
}

export default function useFetch() {
  const [errorCode, setErrorCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetch = (
    service: any,
    data: any,
    success?: (result: any) => void,
    failure?: (result: any) => void,
  ) => {
    setIsLoading(true);

    service(data)
      .then((result: any) => {
        setIsLoading(false);
        if (success) success(result);
      })
      .catch(({ code, message }: any) => {
        setErrorCode(code);
        setErrorMessage(message);
        setIsLoading(false);
        if (failure) failure(code);
      });
  };

  const clearError = (): void => {
    if (errorCode) {
      setErrorCode('');
      setErrorMessage('');
    }
  };

  return {
    isLoading,
    fetch,
    errorCode,
    errorMessage,
    clearError,
  };
}
