import React, { createContext, useContext, useReducer } from 'react';

export const CyNDExContext = createContext();

export const CyNDExProvider = ({ reducer, port, children }) => (
  <CyNDExContext.Provider value={useReducer(reducer, {
    available: 'spoon',
    port: port
  })}>
    {children}
  </CyNDExContext.Provider>
);

export const useCyNDExValue = () => useContext(CyNDExContext);

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}