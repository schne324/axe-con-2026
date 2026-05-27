import { createContext, useContext } from "react";

export type Session = {
  email: string;
  displayName: string;
  memberSince: string;
};

export type AuthContextValue = {
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string) => Session;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
