const today = new Date();
export const modelAccount = {
  accountName: "",
  accountIcon: "FaExclamationCircle",
  currentAmount: 0,
  transactions: [],
};
export const modelCategory = {
  categoryName: "",
  iconName: "",
};
export const modelTransaction = {
  type: "",
  value: "",
  previousAmount: 0,
  date: today.toISOString(),
  category: "",
  origin: "",
  destination: "",
  description: "",
};
export const data = [
  {
    id: "python",
    value: 189,
  },
  {
    id: "javascript",
    label: "javascript",
    value: 271,
  },
  {
    id: "sass",
    value: 259,
  },
  {
    id: "elixir",
    value: 349,
  },
  {
    id: "nombre de ",
    value: 459,
  },
  {
    id: "nombre d",
    value: 459,
  },
  
];
