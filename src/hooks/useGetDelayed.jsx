import { useState } from "react";
import { API_URL } from "../constants/urls";
import useAuth from "./useAuth"

/**
 *
 * @param {string} endpoint
 * @returns {[state:{isError:string, isSuccess:string, isLoading:boolean},data:array|object,fetchData:(queryParams:Object)=>{}, setData: (data:any)=>{}]}
 */
const useGetDelayed = (endpoint) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    isError: null,
    isSuccess: null,
    isLoading: false,
  });
  const {} = useAuth();

  const fetchData = async (queryParams = {}) => {
    setState({ isError: null, isLoading: true });
    const queryString = Object.keys(queryParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
      )
      .join("&");
    try {
      const res = await fetch(API_URL + endpoint + "?" + queryString, {
        method: "GET",
        credentials: "include",
      });
      const json = await res.json();
      if (res.status == 401) {
        //show message and logout
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

  return [state, data, fetchData, setData];
};

export default useGetDelayed;
