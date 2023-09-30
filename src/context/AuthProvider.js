import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [location, setLocation] = useState("");
  const [stop, setStop] = useState(false);

  //const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false)

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, location, setLocation, stop, setStop }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
