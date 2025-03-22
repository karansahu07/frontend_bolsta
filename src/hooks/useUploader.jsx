import { useState } from "react";
import useStore from "./useStore";
import axios from "axios";
import { API_URL } from "../utils/constant";

/**
 *
 * @param {string} endpoint
 * @returns {[state:{isError: String|null, isSuccess: String|null, isLoading: Boolean, progress: number}, upload:(formData: FormData) => Promise<void>]}
 */
const useUploader = (endpoint) => {
  const store = useStore();
  const initState = {
    isError: null,
    isSuccess: null,
    isLoading: false,
    progress: 0 // Track upload progress
  };
  const [state, setState] = useState(initState);

  const upload = async (formData) => {
    setState((p) => ({ ...initState, isLoading: true }));

    try {
      await axios.post(`${API_URL}${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          if (total) {
            const percentage = Math.round((current / total) * 100);
            setState((p) => ({ ...p, progress: percentage }));
          }
        }
      });

      setState((p) => ({ ...p, isSuccess: true }));
      setState((p) => ({ ...p, progress: 0 }));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        store.auth.error = "Session Expired! Please login again";
        store.auth.isAuthenticated = false;
      } else {
        setState((p) => ({ ...p, isError: error.message }));
      }
    } finally {
      setState((p) => ({ ...p, isLoading: false }));
    }
  };

  return [state, upload];
};

export default useUploader;
