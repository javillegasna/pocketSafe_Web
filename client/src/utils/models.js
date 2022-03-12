const today = new Date()
export const modelAccount = {
  accountName: "",
  accountIcon: "FaExclamationCircle",
  currentAmount: 0,
  transactions: [],
}
export const modelCategory = {
  categoryName: "",
  iconName: "",
};
export const modelTransaction =
  {
    type: "",
    value: "",
    previousAmount:0,
    date: today.toISOString(),
    category:"",
    origin: "",
    destination : "",
    description: ""
  }
