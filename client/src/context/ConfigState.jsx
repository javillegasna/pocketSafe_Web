import axios from "axios";
import { useState } from "react";
import Config from "../configuration/default.config";
import ConfigContext from "./ConfigContext";
import { deleteItem, getItems, postItem, putItem } from "../utils/httpActions";

const ConfigState = (props) => {
  //models
  const AccountModel = {
    accountName: "",
    accountIcon: "",
    currentAmount: 0,
    transactions: [],
  };
  const CategoryModel = {
    categoryName: "",
    iconName: "",
  };
  //States
  const [accountList, setAccountList] = useState([AccountModel]);
  const [account, setAccount] = useState(AccountModel);
  const [categoryList, setCategoryList] = useState([CategoryModel]);
  const [category, setCategory] = useState(CategoryModel);
  //Config
  const { API_URL } = Config;
  const accountEndpoint = "account";
  //http actions
  const deleteAccount = (id,idFather) =>
    deleteItem(id, accountEndpoint, setAccountList, accountList,idFather);
  const getAccounts = (set) => getItems(accountEndpoint, set);
  const postAccount = (data) =>
    postItem(accountEndpoint, setAccountList, accountList, data);
  const putAccount = (id, data) =>
    putItem(id, accountEndpoint, setAccountList, accountList, data);
  const getAccount = (id, set) =>
    axios.get(`${API_URL}${accountEndpoint}/${id}`).then((res) => {
      const {_id, accountName, accountIcon, currentAmount, transactions } =
        res.data;
      set({_id, accountName, accountIcon, currentAmount, transactions });
      return {_id, accountName, accountIcon, currentAmount, transactions };
    });
  const categoryEndpoint = "category";
  //http actions
  const deleteCategory = (id,idFather) =>
    deleteItem(id, categoryEndpoint, setCategoryList, categoryList,idFather);
  const getCategories = (set) => getItems(categoryEndpoint, set);
  const postCategory = (data) =>
    postItem(categoryEndpoint, setCategoryList, categoryList, data);
  const putCategory = (id, data) =>
    putItem(id, categoryEndpoint, setCategoryList, categoryList, data);
  const getCategory = (id, set) =>
    axios
      .get(`${API_URL}${categoryEndpoint}/${id}`)
      .then((res) => {
        const { _id,categoryName, iconName } = res.data;
        set({_id, categoryName, iconName });
        return {_id, categoryName, iconName };
      })
      .catch((err) => console.log(err));

  return (
    <ConfigContext.Provider
      value={{
        account,
        setAccount,
        category,
        setCategory,
        accountList,
        setAccountList,
        categoryList,
        setCategoryList,
        deleteAccount,
        getAccounts,
        getAccount,
        postAccount,
        putAccount,
        deleteCategory,
        getCategories,
        getCategory,
        postCategory,
        putCategory,
      }}
    >
      {props.children}
    </ConfigContext.Provider>
  );
};

export default ConfigState;
