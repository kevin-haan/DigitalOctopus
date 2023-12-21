import { createContext, useContext, useState, useCallback } from "react";

const GlobalLoadingStatusContext = createContext();

export const GlobalLoadingStatusProvider = ({ children }) => {
  const [isGloballyLoading, setIsGloballyLoading] = useState(false);

  const startGloballyLoading = useCallback(
    () => setIsGloballyLoading(true),
    []
  );
  const stopGloballyLoading = useCallback(
    () => setIsGloballyLoading(false),
    []
  );

  return (
    <GlobalLoadingStatusContext.Provider
      value={{ isGloballyLoading, startGloballyLoading, stopGloballyLoading }}
    >
      {children}
    </GlobalLoadingStatusContext.Provider>
  );
};

export const useGlobalLoadingStatus = () =>
  useContext(GlobalLoadingStatusContext);
