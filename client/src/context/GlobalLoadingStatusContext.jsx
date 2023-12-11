import { createContext, useContext, useState } from "react";

const GlobalLoadingStatusContext = createContext();

export const GlobalLoadingStatusProvider = ({ children }) => {
  const [isGloballyLoading, setIsGloballyLoading] = useState(false);

  const startGloballyLoading = () => setIsGloballyLoading(true);
  const stopGloballyLoading = () => setIsGloballyLoading(false);

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
