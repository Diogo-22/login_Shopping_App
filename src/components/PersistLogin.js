import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import Home from "./Home";
import { useNavigation } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [persist] = useLocalStorage("persist", false);
  const navigate = useNavigation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        setIsLoading(false);
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        navigate(Home);
      }
    };
    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};
export default PersistLogin;
