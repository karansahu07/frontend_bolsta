import { Navigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AccessControl from "./RouteAccess";
import useAuth from "../hooks/useAuth";

function AuthGuard({ children }) {
  const store = useAuth();
  const {isAuthenticated} = store.auth
  const { pathname } = useLocation();
  const unProtectedRoute = ["/login", "/home", "/"];

  if (isAuthenticated || unProtectedRoute.includes(pathname)) return <AccessControl>{children}</AccessControl>;

  return <Navigate replace to="/login" state={{ from: pathname }} />;
}

export default observer(AuthGuard);
