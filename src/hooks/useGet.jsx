import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { SERVER_URL } from "../constants/urls";

/**
 *
 * @param {string} endpoint
 * @param {array} dependencies
 * @returns {[state:{isError:string|null,isLoading:boolean,isSuccess: boolean},data:array|object,setData:(data:any)]}
 */
const useGet = (endpoint, dependencies = []) => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    isError: null,
    isSuccess: null
  });
  const store = useAuth();
  useEffect(() => {
    (async () => {
      setState({ isError: null, isLoading: true });
      try {
        const res = await fetch(SERVER_URL + endpoint, {
          credentials: "include"
        });
        const json = await res.json();
        if (res.status == 500) {
          setState((p) => ({ ...p, isError: json.message }));
        } else if (res.status == 401) {
          store.logout();
        } else {
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
        }
      } catch (error) {
        setState((p) => ({ ...p, isError: error.message }));
      } finally {
        setState((p) => ({ ...p, isLoading: false }));
      }
    })();
  }, [...dependencies]);

  return [state, data, setData];
};

export default useGet;
