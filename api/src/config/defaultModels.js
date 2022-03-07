//import Category from "../models/category.model";
//import Account from "../models/account.model";
const defaultCategories = [
  {
    iconName: "FaBus",
    categoryName: "Transport",
  },
  {
    iconName: "FaAvianex",
    categoryName: "Travels",
  },
  {
    iconName: "FaBlackTie",
    categoryName: "Clothes",
  },
  {
    iconName: "FaItunesNote",
    categoryName: "Medical Expenses",
  },
  {
    iconName: "FaUsb",
    categoryName: "Technology",
  },
  {
    iconName: "FaCarrot",
    categoryName: "Food",
  },
  {
    iconName: "FaCogs",
    categoryName: "Repairs",
  },
  {
    iconName: "FaFireExtinguisher",
    categoryName: "Accidents",
  },
  {
    iconName: "FaPaw",
    categoryName: "Pets",
  },
];

const defaultAccounts = [
  {
    accountName: "Debit Card",
    currentAmount: 0,
    transactions: [],
  },
  {
    accountName: "Cash",
    currentAmount: 0,
    transactions: [],
  },
  {
    accountName: "Bank Account",
    currentAmount: 0,
    transactions: [],
  },
];

//const Categories = defaultCategories.map((category) => new Category(category));
//const Accounts = defaultAccounts.map((account) => new Account(account));
export { defaultCategories, defaultAccounts };
