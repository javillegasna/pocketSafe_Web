import { ResponsivePie } from "@nivo/pie";
import { useContext, useState } from "react";
import ConfigContext from "../context/ConfigContext";
import UserContext from "../context/UserContext";
const PieChart = () => {
  const [graphSelector, setGraphSelector] = useState(true);
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
    if (graphSelector) return composedData.aggregateList;
    return composedData.expenseList;
  };
  return (
    <div className={"chart-p card mb-3"}>
      <div className="switch-container">
        <input type="checkbox" id="switch" onChange={()=>setGraphSelector(!graphSelector)}/>
        <label for="switch">Toggle</label>
      </div>
      <ResponsivePie
        data={dataHandler()}
        margin={{ top: 10, right: 100, bottom: 45, left: 100 }}
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
    </div>
  );
};
export default PieChart;
