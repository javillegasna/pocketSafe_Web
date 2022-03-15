const today = new Date(Date.now() - (60 * 60000 * 5));
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
  date: today.toISOString().slice(0, -8),
  category: "",
  origin: "",
  destination: "",
  description: "",
};

