import { ResponsivePie } from "@nivo/pie";
import { useContext, useState } from "react";
import ConfigContext from "../context/ConfigContext";
import UserContext from "../context/UserContext";
import { data } from "../utils/models";
//import { data} from "../utils/models";

const PieChart = () => {
  const [graphSelector, setGraphSelector] = useState("aggregate");
  const { account } = useContext(ConfigContext);
  const { user } = useContext(UserContext);

  const listComposer = (list, categoryName, value) => {
    const categoryFound = list.find((item) => item.id === categoryName);
    if (!categoryFound) return [...list, { id: categoryName, value: value }];
    const listWithoutCategory = list.filter(
      (item) => item.id === categoryFound.id
    );
    return [
      ...listWithoutCategory,
      { id: categoryFound.id, value: categoryFound.value + value },
    ];
  };
  const dataComposer = account.transactions.reduce(
    (acc, item) => {
      const { categories } = user;
      const { type, category: categoryId, origin, value } = item;
      const categoryFound = categories.find(
        (category) => category._id === categoryId
      );
      if (type === "Aggregate")
        return {
          ...acc,
          aggregateList: listComposer(
            acc.aggregateList,
            categoryFound.categoryName,
            value
          ),
        };
      if (type === "Expense")
        return {
          ...acc,
          expenseList: listComposer(
            acc.expenseList,
            categoryFound.categoryName,
            value
          ),
        };
      //type expense.
      return origin === account._id
        ? {
            ...acc,
            expenseList: listComposer(acc.expenseList, "Transfer", value),
          }
        : {
            ...acc,
            aggregateList: listComposer(acc.aggregateList, "Transfer", value),
          };
    },
    { aggregateList: [], expenseList: [] }
  );

  const dataHandler = () => {
    const composedData = dataComposer;
    if (graphSelector === "aggregate") return composedData.aggregateList;
    return composedData.expenseList;
  };
  return (
    <ResponsivePie
      data={dataHandler()}
      margin={{ top: 20, right: 100, bottom: 20, left: 100 }}
      innerRadius={0.7}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
    />
  );
};
export default PieChart;
