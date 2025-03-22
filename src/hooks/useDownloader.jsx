import { useState } from "react";
import useStore from "./useStore";
import axios from "axios";
import { API_URL } from "../utils/constant";

/**
 *
 * @param {string} endpoint
 * @returns {[state:{isError: String|null, isSuccess: String|null, isLoading: Boolean, progress: number}, download:(queryParams:Object)=>{}]}
 */
const useDownloader = (endpoint) => {
  const store = useStore();
  const initState = {
    isError: null,
    isSuccess: null,
    isLoading: false,
    progress: 0 // Track download progress
  };
  const [state, setState] = useState(initState);

  const download = async (queryParams = {}) => {
    setState((p) => ({ ...initState, isLoading: true }));

    const queryString = Object.keys(queryParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join("&");

    try {
      const response = await axios({
        url: `${API_URL}${endpoint}?${queryString}`,
        method: "GET",
        responseType: "blob",
        withCredentials: true, // Include credentials like cookies
        onDownloadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          if (total) {
            const percentage = Math.round((current / total) * 100);
            setState((p) => ({ ...p, progress: percentage }));
          }
        }
      })

      const blob = new Blob([response.data]);
      const contentDisposition = response.headers["content-disposition"];
      let filename = "download";
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match) {
          filename = match[1];
          console.log(filename,"filename")
        }
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setState((p) => ({ ...p, isSuccess: true }));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        store.auth.error = "Session Expired! Please login again";
        store.auth.isAuthenticated = false;
      } else {
        const err = await JSON.parse(await error.response.data.text())
        setState((p) => ({ ...p, isError: err.message }));
      }
    } finally {
      setState((p) => ({ ...p, isLoading: false }));
    }
  };

  return [state, download];
};

// export default useDownloader;

export default useDownloader;
