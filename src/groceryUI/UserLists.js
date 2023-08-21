import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useGList from "../hooks/useGList";
import { FaTrashAlt } from "react-icons/fa";

const USERS_URL = "/users";

const UserLists = () => {
  const { auth, setLocation } = useAuth();
  const accessToken = auth?.accessToken ? auth.accessToken : "";
  const userID = auth?.userId;
  const { loadList, setLoadList, setChosenList, chosenList } = useGList();
  const [userLists, setUserLists] = useState([]);
  const navigate = useNavigate();
  const user = auth?.user;
  // console.log(auth);

  useEffect(() => {
    const fetchUserLists = async () => {
      setLocation("user-lists");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };
      try {
        const response = await axios.post(
          USERS_URL,
          {
            id: userID,
          },
          config
        );
        const listsData = response?.data; // Assuming response.data is an array
        console.log(listsData.length);
        if (listsData.length > 0) {
          const listNames = listsData.map((item) => item._id);
          //console.log(listsData);
          // Construct an array of objects containing list names and IDs
          const updatedLoadList = listsData.map((item) => ({
            listname: item.listname,
            listId: item._id,
          }));
          //console.log(updatedLoadList);
          // Update the loadList state with the accumulated array
          setLoadList(updatedLoadList);

          setUserLists(listNames);
        } else if (listsData.length === 0) {
          setUserLists([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserLists();
  }, []);

  const loadUserList = (listId) => {
    const chosenlist = loadList.filter((item) => item.listId === listId);
    console.log("down here");
    console.log(chosenlist[0]);

    setChosenList(chosenlist[0]);
    navigate("/s-list");
  };

  const deleteList = async (listId) => {
    const chosenlist = loadList.filter((item) => item.listId === listId);
    const newUserLists = loadList.filter((item) => item.listId !== listId);
    setLoadList(newUserLists);
    setUserLists(newUserLists.map((item) => item.listname));
    const idToDelete = chosenlist[0].listId;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    const response = await axios.delete(USERS_URL + "/" + idToDelete, config);
    //window.location.reload();
  };
  if (userLists.length === 0) {
    return (
      <section className="user-lists">
        <h2 className="user-lists-title">{user}'s List's 📌</h2>
        <h3 style={{ marginTop: "5rem" }}>
          You Have No Lists, Go Ahead And Create One 🚀
        </h3>
      </section>
    );
  } else if (loadList.length > 0) {
    return (
      <section className="user-lists">
        <h2 className="user-lists-title">{user}'s List's 📌</h2>
        <ul className="user-list">
          {loadList.map((item, index) => (
            <li className="item" key={index}>
              <button
                className="load-list-btn"
                onClick={() => {
                  loadUserList(item.listId);
                }}
              >
                {item.listname}
              </button>
              <FaTrashAlt
                className="trash-icon"
                onClick={() => {
                  deleteList(item.listId);
                }}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  } else {
    return (
      <section className="user-lists">
        <h2 className="user-lists-title">{user}'s List's 📌</h2>
        <h3 style={{ marginTop: "5rem" }}>Your List's are Loading...🚀</h3>
      </section>
    );
  }
};

export default UserLists;
