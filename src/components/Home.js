import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const Home = () => {
  const { setLocation } = useAuth();
  useEffect(() => {
    setLocation("home"); // Move the setLocation inside the useEffect
  }, []);
  return (
    <section>
      <h1>Home</h1>
      <br />
      <Link to="/new-list">Create a new Shooping List!!</Link>
      <br />
      <Link to="/user-lists">My Shooping List's</Link>
      <br />
      {/*  <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link> */}
    </section>
  );
};

export default Home;
