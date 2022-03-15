import Icon from "./Icon";
import { BsCashCoin } from "react-icons/bs";
import { RiHandCoinFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import ConfigContext from "../context/ConfigContext";
import UserContext from "../context/UserContext";
import { useContext } from "react";
const TransactionsList = () => {
  const { account } = useContext(ConfigContext);
  const { user } = useContext(UserContext);
  const dateToLocal = (ISOdate) => {
    const msDate = Date.parse(ISOdate.slice(0, -1));
    const msLocalDate = new Date(msDate);
    const stringDate = msLocalDate.toISOString().slice(0, -8).split("T");
    return `${stringDate[0]}  ${stringDate[1]}`;
  };
  return (
    <div>
      {account.transactions.map((transaction) => {
        const {
          _id,
          type,
          value,
          date,
          previousAmount,
          category,
          description,
          origin,
          destination,
        } = transaction;
        const { accounts, categories } = user;
        const foundOrigin = accounts.find((el) => el._id === origin);
        const foundDestination = accounts.find((el) => el._id === destination);
        const foundCategory = categories.find((el) => el._id === category);
        return (
          <details key={_id} className={type}>
            <summary className="d-flex justify-content-between">
              <div className="p-0 m-0">
                <div className="p-1 me-2">
                  {type === "Transfer" ? (
                    <BiTransfer />
                  ) : type === "Aggregate" ? (
                    <BsCashCoin />
                  ) : (
                    <RiHandCoinFill />
                  )}
                </div>
                <div className="p-0 m-0">{`${type}: $${value} `}</div>
              </div>
              <Icon
                customStyle={"ms-3 p-0 m-0"}
                iconName={"FaCalendarAlt"}
                message={dateToLocal(date)}
              />
            </summary>
            <div>{`Previous: $${previousAmount} `}</div>
            {category && (
              <div>
                <span className="pt-1">Category:</span>{" "}
                <Icon
                  iconName={foundCategory.iconName}
                  message={foundCategory.categoryName}
                />
              </div>
            )}
            {origin && (
              <div>
                <span className="pt-1">Origin:</span>
                <Icon
                  iconName={foundOrigin.accountIcon}
                  message={foundOrigin.accountName}
                />{" "}
                <span className="pt-1">Destination:</span>
                <Icon
                  iconName={foundDestination.accountIcon}
                  message={foundDestination.accountName}
                />
              </div>
            )}
            {description && <div> {description} </div>}
          </details>
        );
      })}
    </div>
  );
};
export default TransactionsList;
