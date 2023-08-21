import React from "react";
import axios from "../api/axios"; // Import Axios from the correct path
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const USERS_URL = "/lists";

const MainMenu = () => {
  const { auth } = useAuth();
  const userID = auth?.userId;
  const navigate = useNavigate();

  const updateList = async () => {
    try {
      const response = await axios.patch(USERS_URL, {
        id: `${userID}`,
        items: {
          name: "Milk",
          numid: 1,
          checked: false,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserLists = async () => {
    navigate("/user-lists");
  };

  return (
    <>
      <button onClick={updateList}>Update list</button>
      <button onClick={getUserLists}>My List's</button>
    </>
  );
};

export default MainMenu;
