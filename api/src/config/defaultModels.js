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
    accountIcon:"FaCreditCard",
    currentAmount: 0,
    transactions: [],
  },
  {
    accountName: "Cash",
    accountIcon:"FaRegMoneyBillAlt",
    currentAmount: 0,
    transactions: [],
  },
  {
    accountName: "Bank Account",
    accountIcon:"FaPiggyBank",
    currentAmount: 0,
    transactions: [],
  },
];
const defaultRoles = [{ name: "user" }, { name: "client" }, { name: "admin" }];
const defaultUsers = [
  {
    email: "admin@admin.com",
    password: "admin",
    roles: ["admin"],
  },
  {
    email: "client@frontEnd.com",
    password: "client",
    roles: ["client"],
  },
  {
    email: "demo@test.com",
    password: "password",
  }
];
//const Categories = defaultCategories.map((category) => new Category(category));
//const Accounts = defaultAccounts.map((account) => new Account(account));
export { defaultCategories, defaultAccounts, defaultRoles, defaultUsers};
