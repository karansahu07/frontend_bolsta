import axios from "axios";
import CryptoJS from "crypto-js";
import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { API_URL } from "../constants/urls";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

const SECRET_KEY = "your-secret-key";

const dummyUser = {
  role: "admin",
  username: "karan",
  email: "karan@ekarigar.com",
  homeRoute: "/dashboard",
  avatar: "",
};

class AuthStore {
  auth = {
    user: {
      email: null,
      avatar: null,
      role: null,
      username: null,
      homeRoute: "/login",
    },
    isInitialized: false,
    isAuthenticated: false,
    isSubmitting: false,
    error: null,
    message: null,
  };

  constructor() {
    makeObservable(this, {
      login: action,
      logout: action,
      initialize: action,
      auth: observable,
      getRole: computed,
    });

    this.loadFromLocalStorage();

    // Save only when auth changes significantly (avoiding excessive writes)
    autorun(() => {
      if (this.auth.isInitialized) {
        this.saveToLocalStorage();
      }
    });
  }

  encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  }

  decryptData(cipherText) {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  }

  saveToLocalStorage() {
    try {
      const encryptedData = this.encryptData({ auth: this.auth });
      localStorage.setItem("settings", encryptedData);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  loadFromLocalStorage() {
    const encryptedData = localStorage.getItem("settings");
    if (encryptedData) {
      try {
        const parsedData = this.decryptData(encryptedData);
        if (parsedData && parsedData.auth) {
          runInAction(() => {
            this.auth = parsedData.auth;
          });
          console.log("Loaded auth from storage:", this.auth);
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error);
      }
    }
  }

  async initialize() {
    runInAction(() => (this.auth.isSubmitting = true));

    try {
      const response = await axios.get("/auth/profile"); // Will fail if backend is down
      const { data } = response.data;
  
      runInAction(() => {
        this.auth.isAuthenticated = true;
        this.auth.user = { ...data.user }; // Assign user from API response
      });
    } catch (err) {
      console.warn("Backend is not running. Using dummy user.");
      return
    } finally {
      runInAction(() => {
        this.auth.isInitialized = true;
        this.auth.isSubmitting = false;
      });
    }
  }
  

  async login(email, password) {
    runInAction(() => (this.auth.isSubmitting = true));
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { data } = response.data;
      runInAction(() => {
        this.auth.isAuthenticated = true;
        this.auth.user = data.user;
        this.auth.message = "Logged in successfully";
      });
    } catch (error) {
      runInAction(() => {
        this.auth.error = error.response?.data?.msg || "Login failed.";
      });
    } finally {
      runInAction(() => {
        this.auth.isSubmitting = false;
      });
    }
  }

  async logout() {
    try {
      await axios.get("/auth/logout");
      runInAction(() => {
        this.auth.isAuthenticated = false;
        this.auth.user = {
          email: null, // 🔹 FIX: Added missing email field
          avatar: null,
          role: null,
          username: null,
          homeRoute: "/login",
        };
        this.auth.message = "Logged Out Successfully";
      });
    } catch (error) {
      console.error("Logout failed:", error);
      runInAction(() => {
        this.auth.error = "Logout Failed.";
      });
    }
  }

  get getRole() {
    return this.auth.user.role || "guest";
  }
}

export default AuthStore;
