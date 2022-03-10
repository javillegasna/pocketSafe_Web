import axios from "axios";
import { useState } from "react";
import Config from "../configuration/default.config";
import UserContext from "./UserContext";
import { deleteItem, getItems, postItem, putItem } from "../utils/httpActions";

const UserState = (props) => {
  //States
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState();
  const [token, setToken] = useState("");
  //Config
  const { API_URL } = Config;
  const endpoint = "user";
  //http actions
  const deleteUser = (id) => deleteItem(id, endpoint, setUserList, userList);
  const getUsers = (set) => getItems(endpoint, set);
  const postUser = (data) => postItem(endpoint, setUserList, userList, data);
  const putUser = (id, data) =>
    putItem(id, endpoint, setUserList, userList, data);
  const getUser = (id, set) =>
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        const { userName, email, roles, password, categories, accounts } =
          res.data;
        set({ userName, email, roles, password, categories, accounts });
      })
      .catch((err) => console.log(err));

  return (
    <UserContext.Provider
      value={{
        userList,
        setUserList,
        user,
        setUser,
        token,
        setToken,
        deleteUser,
        getUsers,
        getUser,
        postUser,
        putUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
