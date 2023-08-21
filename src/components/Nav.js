import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

const Nav = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth, location } = useAuth();
  //console.log(location);
  let content = "";
  const username = localStorage.getItem("user");
  //console.log(username);

  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  const goToHome = () => {
    navigate("/");
  };
  if (location === "home") {
    content = (
      <>
        <h1 className="welcome" onClick={goToHome}>
          Welcome {username.replace(/"/g, "")}!
        </h1>
        <button onClick={signOut}>Logout</button>
      </>
    );
  } else if (location === "login") {
    content = <p className="init-message">Please Sign In To Continue ^__^</p>;
  } else if (location === "main-page") {
    content = (
      <>
        <button>
          <Link to={"/"}>Home</Link>
        </button>
        <button>
          <Link to={"/add-user"}>Add User</Link>
        </button>
        <button onClick={signOut}>Logout</button>
      </>
    );
  } else if (location === "user-lists") {
    content = (
      <>
        <button>
          <Link to={"/"}>Home</Link>
        </button>
        <button onClick={signOut}>Logout</button>
      </>
    );
  }

  return <nav className="Nav">{content}</nav>;
};

export default Nav;
