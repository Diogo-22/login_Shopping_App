import { createContext, useState } from "react";

const GListContext = createContext({});

export const GroceryListProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [reqType, setReqType] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadList, setLoadList] = useState({});
  const [chosenList, setChosenList] = useState({});

  return (
    <GListContext.Provider
      value={{
        items,
        setItems,
        newItem,
        setNewItem,
        search,
        setSearch,
        reqType,
        setReqType,
        loading,
        setLoading,
        loadList,
        setLoadList,
        chosenList,
        setChosenList,
      }}
    >
      {children}
    </GListContext.Provider>
  );
};

export default GListContext;
