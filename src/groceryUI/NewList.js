import React, { useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useGList from "../hooks/useGList";
import { useEffect } from "react";

const NewList = () => {
  const [listName, setListName] = useState("");
  const LISTS_URL = "/lists";
  const USERS_URL = "/users";
  const { auth } = useAuth();
  const { setChosenList, setLoadList, loadList } = useGList();
  const accessToken = auth?.accessToken ? auth.accessToken : "";
  //console.log(accessToken);
  const userID = auth?.userId;
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //console.log(Object.keys(loadList).length);
    const getLoadList = async () => {
      if (Object.keys(loadList).length === 0) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        };
        //let updatedLoadList = [];
        try {
          const response = await axios.post(
            USERS_URL,
            {
              id: userID,
            },
            config
          );
          const listsData = response?.data; // Assuming response.data is an array

          // Construct an array of objects containing list names and IDs
          /* const updatedLoadList = listsData.map((item) => ({
            listname: item.listname,
            listId: item._id,
          })); */

          if (listsData.length != 0) {
            setMessage(true);
            return navigate("/");
          } else if (listsData.length === 0) {
            setLoadList(listsData);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getLoadList();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (message === false) {
      let checkListName;
      /* console.log("loadList");
      console.log(loadList); */
      if (loadList.length === 0) {
        checkListName = [];
      } else {
        checkListName = loadList.filter((item) => item.listname === listName);
      }

      // console.log(checkListName);
      if (checkListName.length > 0) {
        setMessage(true);
        return;
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        };
        try {
          const response = await axios.post(
            LISTS_URL,
            {
              id: userID,
              listname: listName,
              items: {
                name: "New Shopping List :)",
                numid: 1,
                checked: false,
              },
            },
            config
          );
          console.log(response);
          if (response.status === 201) {
            try {
              const response = await axios.post(
                USERS_URL,
                {
                  id: userID,
                },
                config
              );

              const listsData = response?.data; // Assuming response.data is an array

              // Construct an array of objects containing list names and IDs
              const updatedLoadList = listsData.map((item) => ({
                listname: item.listname,
                listId: item._id,
              }));
              //console.log(updatedLoadList);
              // Update the loadList state with the accumulated array
              setLoadList(updatedLoadList);
              const chosenList = updatedLoadList.filter(
                (item) => item.listname === listName
              );
              setChosenList(chosenList[0]);
              navigate("/s-list");
            } catch (error) {
              console.log(error);
            }
            //console.log(response);
          }
        } catch (error) {
          if (error?.response?.status === 400) {
            setMessage(true);
          }
        }
      }
    }
  };

  return (
    <section>
      {message && <p>Listname already exists</p>}
      <h2 style={{ marginTop: "2vh" }}>New Shopping List 💥</h2>

      <form className="new-list" onSubmit={handleSubmit}>
        <label className="offscreen" htmlFor="listname">
          Listname:
        </label>
        <h3 className="listname-label">Listname:</h3>

        <input
          type="text"
          id="listname"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default NewList;
