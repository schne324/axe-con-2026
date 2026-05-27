import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";
import type { ReactNode } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const target = location.pathname + location.search;
    const loginPath = `/login?redirect_uri=${encodeURIComponent(target)}`;
    return <Navigate to={loginPath} replace />;
  }

  return <>{children}</>;
}
