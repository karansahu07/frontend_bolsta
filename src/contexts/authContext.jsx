import { createContext, useMemo } from "react";
import AuthStore from "../stores/authStore";

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
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authStore = useMemo(() => new AuthStore(), []); // Ensures the store is stable

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};
