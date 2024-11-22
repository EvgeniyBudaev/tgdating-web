import { createContext, useContext } from "react";

export const AuthenticityTokenContext = createContext<string | null>(null);
export const AuthenticityTokenProvider = AuthenticityTokenContext.Provider;

export const useAuthenticityTokenContext = (): string | null => {
  return useContext(AuthenticityTokenContext);
};
