import Icon from "./Icon";
import { BsCashCoin } from "react-icons/bs";
import { RiHandCoinFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import ConfigContext from "../context/ConfigContext";
import UserContext from "../context/UserContext";
import { useContext } from "react";
const TransactionsList = () => {
  const { account} = useContext(ConfigContext);
  const { user } = useContext(UserContext);
  return ( <div>
    {account.transactions.map((transaction) => {
        const {
          _id,
          type,
          value,
          previousAmount,
          category,
          description,
          origin,
          destination,
        } = transaction;
        const { accounts, categories } = user;
        const foundOrigin = accounts.find((el) => el._id === origin);
        const foundDestination = accounts.find((el) => el._id === destination);
        const foundCategory = categories.find((el) => (el._id = category));
        return (
          <details key={_id} className={type}>
            <summary>
              <div>
                {type === "Transfer" ? (
                  <BiTransfer />
                ) : type === "Aggregate" ? (
                  <BsCashCoin />
                ) : (
                  <RiHandCoinFill />
                )}
              </div>
              <div>{`${type}: $${value}`}</div>
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
  </div> );
}
export default TransactionsList;