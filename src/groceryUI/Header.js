import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Header = () => {
  const [navVisible, setNavVisible] = useState(false);
  const navigate = useNavigate();
  const { location } = useAuth();
  const signOut = useLogout();
  let content;
  const Logout = async () => {
    await signOut();
    navigate("/login");
  };
  const newList = () => {
    navigate("/new-list");
  };
  const addUser = () => {
    navigate("/add-user");
  };
  const usersList = () => {
    navigate("/");
  };
  if (location === "user-lists") {
    content = (
      <>
        {/* <h1 className="welcome" onClick={goToHome}>
          Welcome {username.replace(/"/g, "")}!
        </h1> */}
        <li onClick={newList}>Create New List</li>
        <li onClick={Logout}>Logout</li>
      </>
    );
  } else if (location === "login") {
    content = (
      <li /* className="init-message" */>Please Sign In To Continue ^__^</li>
    );
  } else if (location === "main-page") {
    content = (
      <>
        <li onClick={usersList}>My lists</li>
        <li onClick={addUser}>Add User</li>
        <li onClick={signOut}>Logout</li>
      </>
    );
  }
  const openNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <header className="header">
      <section className="header__title__line">
        <div className="header__div">
          <Link to={"/"}>
            <img
              src={logo}
              alt="site logo"
              width="200"
              height="200"
              className="header__img"
            />
          </Link>
        </div>
        <button className="menu-button" onClick={openNav}>
          <div className="menu-icon header__div"></div>
        </button>
      </section>

      <nav className={`main__nav ${navVisible ? "active" : ""}`} id="main-nav">
        <ul>{content}</ul>
      </nav>
    </header>
  );
};

export default Header;
