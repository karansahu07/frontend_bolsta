import { useState } from "react";
import { API_URL } from "../constants/urls";
import useAuth from "./useAuth"
/**
 *
 * @param {string} endpoint
 * @returns {[state:{isError:null|string,isSuccess:null|string,isLoading:boolean}, data:array|oject, post:function]}
 */
const usePutFormData = (endpoint) => {
  const {} = useAuth();
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    isError: null,
    isSuccess: null,
    isLoading: false,
  });
  /**
   *
   * @param {object} body
   */
  const put = async (body) => {
    const formData = new FormData();
    Object.entries(body).forEach(([k, v]) => formData.append(k, v));
    setState({
      isError: null,
      isSuccess: null,
      isLoading: false,
    });
    try {
      const res = await fetch(API_URL + endpoint, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      const json = await res.json();
      if (res.status == 401) {
       //logout and show message
      } else if (res.status == 200) {
        if (Array.isArray(json.data)) {
          if (typeof json.meta === "object" && json.meta !== null) {
            setData({ data: [...json.data], pagination: { ...json.meta } });
          } else if (json.meta === null || json.meta === undefined) {
            setData([...json.data]); // Correctly setting an array
          } else {
            setData([...json.data]); // Fallback to array state
          }
        } else {
          setData((p) => ({ ...json.data }));
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
  return [state, data, put];
};

export default usePutFormData;
