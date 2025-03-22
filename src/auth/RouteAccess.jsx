import { useLocation, Navigate, matchPath } from "react-router-dom";
import {navigations} from "../navigations";

const AccessControl = ({ children: Component }) => {
  const location = useLocation();
  const routes = navigations.map((val) => val.path);
  const isAccessible = routes.some((pattern) =>
    matchPath(pattern, location.pathname)
  );
  if (!isAccessible) return <Navigate to="/accessRestricted" />;

  return <>{Component}</>;
};

export default AccessControl;
