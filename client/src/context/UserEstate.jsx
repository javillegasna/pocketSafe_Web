import axios from "axios";
import { useState } from "react";
import Config from "../configuration/default.config";
import UserContext from "./UserContext";

const UserState = (props) => {
  //States
  const [userList, setUserList] = useState([]);
  const [user,setUser]=useState()
  const [token,setToken]=useState("")
  //Config
  const {API_URL}=Config;
  //http actions
  const deleteItem = (id) => {
    axios
      .delete(`${API_URL}user/${id}`)
      .then((res) =>
        setUserList(userList.filter((user) => res.data._id !== user._id))
      )
      .catch((err) => console.log(err));
  };
  const getItems = (set) => {
    axios
      .get(`${API_URL}user/`)
      .then((res) => {
        set(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getItem = (id, set) => {
    axios
      .get(`${API_URL}/user/${id}`)
      .then((res) => {
        const{userName,
          email,
          roles,
          categories,
          accounts,}=res.data
        set({userName,
          email,
          roles,
          categories,
          accounts,});
      })
      .catch((err) => console.log(err));
  };
  const postItem = (data) =>
    axios
      .post(`${API_URL}/user`, data)
      .then((res) => {
        setUserList([res.data, ...userList]);
      })
      .catch((err) => err.response.data.data);
  const putItem = (id, data) =>
    axios
      .put(`${API_URL}/user/${id}`, data)
      .then((res) => {
        const filteredItems = userList.filter(
          (user) => res.data._id !== user._id
        );
        setUserList([res.data, ...filteredItems]);
      })
      .catch((err) => err.response.data.data.errors);

  return (
    <UserContext.Provider
      value={{
        userList,
        setUserList,
        user,
        setUser,
        token,
        setToken,
        deleteItem,
        getItems,
        getItem,
        postItem,
        putItem,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;