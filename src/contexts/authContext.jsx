import { createContext, useEffect, useMemo } from "react";
import AuthStore from "../stores/authStore";
import { useLocation } from "react-router-dom";

const initialContext = {
  auth: {
    user: {
      username: "",
      email: "",
      role: "",
      homeRoute: "",
      avatar: "",
    },
    isAuthenticated: false,
    isInitialized: false,
    isSubmitting: false,
    error: null,
    message: null,
  },
  login: async (email, password) => Promise.resolve(),
  logout: () => {},
  initialize: () => {},
  getRole: () => null,
  getUser: () => null,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authStore = useMemo(() => new AuthStore(), []); // Ensures the store is stable

  const { pathname } = useLocation();
  const unProtectedRoute = ["/home", "/login", "/"];
  useEffect(() => {
    (async () => {
      await authStore.initialize();
      if (unProtectedRoute.includes(pathname)) authStore.auth.error = null;
    })();
  }, [authStore]);

  if (!authStore.auth.isInitialized) {
    return <h1>Loading</h1>;
  }

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};
