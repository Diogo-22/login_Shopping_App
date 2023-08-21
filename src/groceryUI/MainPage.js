import React from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import Content from "./Content";
import useGList from "../hooks/useGList";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const {
    items,
    setItems,
    loading,
    newItem,
    setNewItem,
    search,
    setSearch,
    reqType,
    setReqType,
    loadList,
    chosenList,
  } = useGList();
  const { auth, setLocation } = useAuth();
  const accessToken = auth?.accessToken ? auth.accessToken : "";

  //RUNS WHEN PAGE IS LOADED, FETCHES ITEMS

  useEffect(() => {
    const fetchItems = async () => {
      //console.log(chosenList.listId);
      setLocation("main-page");
      try {
        const response = await fetch(
          `http://localhost:3500/groceries/${chosenList.listId}`,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        const Items = (await response.json()) || [];

        if (Items) {
          setItems(Items);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.log(err.stack);
        navigate("/");
      }
    };
    if (chosenList.listId === undefined) {
      navigate("/");
      return console.log("nothing to send");
    } else {
      fetchItems();
    }
  }, []);

  useEffect(() => {
    //RUNS WHEN THE ITEMS ARRAY CHANGES
    const updateDB = async () => {
      if (reqType === "") {
        return console.log("nothing to send");
      } else if (reqType === "PUT") {
        items.map((item) =>
          fetch(`http://localhost:3500/groceries/${chosenList.listId}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify({
              name: item.name,
              id: item.id,
              checked: `${item.checked}`,
            }),
          })
        );
        setReqType("");
      } else if (reqType === "POST") {
        setNewItem("");
        setReqType("");

        fetch(`http://localhost:3500/groceries/${chosenList.listId}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            name: newItem.name,
            id: newItem.id,
            checked: `${newItem.checked}`,
          }),
        });
      } else {
        console.log("Not sure why it reached this log..");
      }
    };
    updateDB();
  }, [items]);

  //ADD ITEM TO DB

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {
      name: item,
      id: id,
      checked: false,
    };

    setNewItem(myNewItem);
    const listItems = [...items, myNewItem];
    //setReqType(myNewItem)
    setReqType("POST");
    setItems(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
  };

  const handleCheck = (id) => {
    setReqType("PUT");
    const listItems = items.map((item) =>
      item.id === id
        ? {
            name: item.name,
            id: id,
            checked: !item.checked,
          }
        : item
    );
    setItems(listItems);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    await fetch(`http://localhost:3500/groceries/${chosenList.listId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    setItems(listItems);
  };

  return (
    <>
      <section>
        <h2 className="list-name">{chosenList.listname}</h2>
        <AddItem
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem search={search} setSearch={setSearch} />
        <Content
          loading={loading}
          search={search}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          items={items}
        />
      </section>
      {/*  <footer>
        <p>
          {items.length} List {items.length === 1 ? "item" : "items"}
        </p>
      </footer> */}
    </>
  );
};

export default MainPage;
