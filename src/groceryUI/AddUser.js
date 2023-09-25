import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import useGList from "../hooks/useGList";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AddUser = () => {
  const { auth, setLocation } = useAuth();
  const accessToken = auth?.accessToken ? auth.accessToken : "";
  const [search, setSearch] = useState("");
  const { chosenList } = useGList();
  const [userAdded, setUserAdded] = useState(false);
  //const userId = auth?.userId;

  const USER_URL = `/users/${search}`;
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [userData, setUserData] = useState(null); // Initialize with null

  useEffect(() => {
    const fetchUserData = async () => {
      setLocation("user-lists");
    };

    fetchUserData();
  }, [USER_URL]);

  const makeSearch = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    try {
      const response = await axios.get(USER_URL, config);
      //console.log(response.data.map((item) => item.username));
      const user = response.data.username;
      //console.log(user);

      setUserData(response.data); // Set the fetched data to the state
    } catch (error) {
      navigate("/");
      console.error("Error fetching user data:", error);
    }
  };

  const addUserToList = async () => {
    //console.log(chosenList);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    try {
      const response = await axios.patch(
        "/users",
        {
          listid: chosenList.listId,
          userid: userData._id,
        },
        config
      );
      const user = response.data;
      if (response.status === 200) {
        setUserAdded(true);
        const goBack = () => {
          navigate(from, { replace: true });
          setUserAdded(false);
        };
        setTimeout(goBack, 5000);
        //navigate(from, { replace: true });
        console.log("trust me bros");
      }
      //navigate("/");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <section>
      {/* <SearchItem search={search} setSearch={setSearch} /> */}
      <form className="addForm" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          role="searchbox"
          placeholder="Search Users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          style={{ cursor: "pointer" }}
          onClick={makeSearch}
          className="search-user"
        >
          🔎
        </button>
      </form>
      {userAdded ? (
        <h1>{userData.username}, has been added to the List🎇🎇</h1>
      ) : userData ? (
        <>
          <h1>User:</h1>
          <button style={{ cursor: "pointer" }} onClick={addUserToList}>
            {userData.username}
          </button>
        </>
      ) : userData === undefined ? (
        <p>User does not exist</p>
      ) : (
        <p>Search User To add To Your List...</p>
      )}
      {/* {userData ? (
        <>
          <h1>User Details</h1>
          {userData.map((item, index) => (
            <button key={index}>User: {item} </button>
          ))}
        </>
      ) : (
        <p>Loading user data...</p>
      )} */}
    </section>
  );
};

export default AddUser;
