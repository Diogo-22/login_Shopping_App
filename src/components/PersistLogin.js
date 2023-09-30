import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const refresh = useRefreshToken();
  const { auth, stop, setStop } = useAuth();
  const [persist] = useLocalStorage("persist", false);
  const navigate = useNavigate();
  /* console.log("its looping");
  console.log(stop); */

  useEffect(() => {
    const verifyRefreshToken = async () => {
      //console.log(isLoading);

      if (stop == false) {
        try {
          console.log("going to try refreshing");
          setIsLoading(false);
          await refresh();
        } catch (err) {
          //console.error(err);
          setStop(true);
          setIsLoading(false);
        } finally {
          setIsLoading(false);
          navigate(Home);
        }
      }
    };
    if (!auth.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [auth.accessToken, stop]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};
export default PersistLogin;
