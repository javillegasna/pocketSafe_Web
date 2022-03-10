import axios from "axios";
import Config from "../configuration/default.config";
const { API_URL } = Config;
export const deleteItem = (id, endpoint, set, list) => {
  axios
    .delete(API_URL + endpoint + "/" + id)
    .then((res) => set(list.filter((item) => res.data._id !== item._id)))
    .catch((err) => console.log(err));
};
export const getItems = (endpoint, set) => {
  axios
    .get(API_URL + endpoint)
    .then((res) => {
      set(res.data);
    })
    .catch((err) => console.log(err));
};
export const postItem = (endpoint, set, list, data) =>
  axios
    .post(API_URL + endpoint, data)
    .then((res) => {
      set([res.data, ...list]);
    })
    .catch((err) => err.response.data.data);
export const putItem = (id, endpoint, set, list, data) =>
  axios
    .put(API_URL + endpoint + "/" + id, data)
    .then((res) => {
      const filteredItems = list.filter((user) => res.data._id !== user._id);
      set([res.data, ...filteredItems]);
    })
    .catch((err) => err.response.data.data.errors);
