import axios from "axios";
import Config from "../configuration/default.config";
const { API_URL } = Config;
export const deleteItem = async (id, endpoint, set, list,idFather="") =>
  await axios.delete(`${API_URL}${endpoint}/${idFather?`${idFather}/${id}`:`${id}`}`).then((res) => {
    set(list.filter((item) => res.data._id !== item._id));
    return res.data;
  });

export const getItems = async (endpoint, set) =>
  await axios.get(API_URL + endpoint).then((res) => {
    set(res.data);
    return res.data;
  });

export const postItem = async (endpoint, set, list, data) =>
  await axios.post(API_URL + endpoint, data).then((res) => {
    set([res.data, ...list]);
    return res.data;
  });
export const putItem = async (id, endpoint, set, list, data) =>
  await axios.put(API_URL + endpoint + "/" + id, data).then((res) => {
    const filteredItems = list.filter((user) => res.data._id !== user._id);
    set([res.data, ...filteredItems]);
    return res.data;
  });
