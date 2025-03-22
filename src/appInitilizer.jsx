import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { observer } from "mobx-react-lite";

const Initializer = ({ children }) => {
  const navigate = useNavigate();
  const store = useAuth();
  const { auth } = store;

  // Initialize authentication store only once
  useEffect(() => {
    if (!auth.isInitialized) {
      store.initialize(); // Fixed spelling
    }
  }, [auth.isInitialized]);

  // Redirect to home route when authenticated
//   useEffect(() => {
//     if (auth.isAuthenticated && !auth.isSubmitting) {
//       navigate(auth.user?.homeRoute || "/dashboard");
//     }
//   }, [auth.isAuthenticated, auth.isSubmitting, navigate]);

  return <>{children}</>;
};

export default observer(Initializer);
