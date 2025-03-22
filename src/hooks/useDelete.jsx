import { useEffect, useState } from "react";
import { API_URL } from "../utils/constant";
import useStore from "./useStore";
import { message } from "antd";

/**
 *
 * @param {string} endpoint
 * @returns {[state:{isSuccess:null|string,isError:null|string,isLoading:boolean},deletedId:string,makeDeleteRequest:(body:any, queryParams:{})=>{}]}
 */
const useDelete = (endpoint) => {
  const [deletedId, setData] = useState([]);
  const [state, setState] = useState({
    isError: null,
    isSuccess: null,
    isLoading: false
  });
  const store = useStore();

  const makeDeleteRequest = async (body, queryParams = {}) => {
    setState({
      isSuccess: null,
      isError: null,
      isLoading: true
    });
    const queryString = Object.keys(queryParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join("&");
      const options = {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        credentials: "include"
      }
      if(body){
        options.body = JSON.stringify(body)
      }
    try {
      const res = await fetch(API_URL + endpoint + "?" + queryString, options);
      const json = await res.json();
      if (res.status == 401) {
        store.auth.error = "Session Expired ! Please login again";
        store.auth.isAuthenticated = false;
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
  return [state, deletedId, makeDeleteRequest];
};

export default useDelete;
