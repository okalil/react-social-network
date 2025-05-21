import { getUsername } from "../data/user";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const username = getUsername();
  if (!username) {
    return <Navigate to="/sign-up" />;
  }

  return <Outlet />
}
