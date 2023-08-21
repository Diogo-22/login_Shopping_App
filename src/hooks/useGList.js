import { useContext } from "react";
import GListContext from "../context/GroceryListProvider";

const useGList = () => {
    return useContext(GListContext)
}

export default useGList