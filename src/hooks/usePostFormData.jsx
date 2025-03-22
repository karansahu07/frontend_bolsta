import { useEffect, useState } from "react";
import { API_URL } from "../utils/constant";
import useStore from "./useStore";
import { message } from "antd";
import { observer } from "mobx-react-lite";

/**
 *
 * @param {string} endpoint
 * @returns {[state:{isError:null|string,isSuccess:null|string,isLoading:boolean}, data:any, post:function]}
 */
const usePostFormData = (endpoint) => {
  const store = useStore();
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    isError: null,
    isSuccess: null,
    isLoading: false
  });
  /**
   *
   * @param {object} body
   */
  const post = async (body) => {
    const formData = new FormData();
    Object.entries(body).forEach(([k, v]) => formData.append(k, v));
    setState({
      isError: null,
      isSuccess: null,
      isLoading: false
    });
    try {
      const res = await fetch(API_URL + endpoint, {
        method: "POST",
        credentials: "include",
        body: formData
      });
      const json = await res.json();
      if (res.status == 401) {
        store.auth.error = "Session Expired ! Please login again";
        store.auth.isAuthenticated = false;
      } else if (res.status == 201) {
        if (Array.isArray(json.data)) {
          if (typeof json.meta === "object" && json.meta !== null) {
            setData({ data: [...json.data], pagination: { ...json.meta } });
          } else if (json.meta === null || json.meta === undefined) {
            setData([...json.data]); // Correctly setting an array
          } else {
            setData([...json.data]); // Fallback to array state
          }
        } else {
          setData({...json.data})
        }        
        setState((p) => ({ ...p, isSuccess: json.message }));
      } else {
        setState((p) => ({ ...p, isError: json.message }));
      }
    } catch (error) {
      setState((p) => ({ ...p, isError: error.message }));
    } finally {
      setState((p) => ({ ...p, isLoading: false }));
    }
  };
  return [state, data, post];
};

export default usePostFormData;
