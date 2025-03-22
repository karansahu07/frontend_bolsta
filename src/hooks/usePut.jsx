import { useState } from "react";
import { API_URL } from "../constants/urls";
import useAuth from "./useAuth"
/**
 *
 * @param {string} endpoint
 * @param {string} loadingMsg
 * @param {string} successMsg
 * @param {string} errorMsg
 * @returns {[state:{isError:string|null,isSuccess:string|null,isLoading:boolean}, data:array|object, put:(body:object)=>{}]}
 */
const usePut = (endpoint, queryParams) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    isError: null,
    isSuccess: null,
    isLoading: false,
  });
  const {} = useAuth();
  /**
   *
   * @param {object} body
   */
  const put = async (body) => {
    setState({ isError: null, isSuccess: null, isLoading: true });
    try {
      const res = await fetch(API_URL + endpoint, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
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
          setData({ ...json.data });
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

export default usePut;
