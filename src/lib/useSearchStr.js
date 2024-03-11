import { useEffect, useState } from 'react';

const usePersistedState = (initialState, sessionStorageKey) => {
  const [state, setState] = useState(() => {
    const persistedValue = sessionStorage.getItem(sessionStorageKey);

    // session storage always works only with strings, means 'persistedValue' here is a string
    return persistedValue ? JSON.parse(persistedValue) : initialState;
  });

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
  }, [state, sessionStorageKey]);

  return [state, setState];
};

export const useSearchStr = () => {
  return usePersistedState('', 'searchString');
};
