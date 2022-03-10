/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsCashCoin } from "react-icons/bs";
import { RiHandCoinFill } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import ConfigContext from "../context/ConfigContext";
import Icon from "../components/Icon";
const Account = () => {
  const { getAccount, account, setAccount } = useContext(ConfigContext);
  const { accountId } = useParams();
  useEffect(() => {
    getAccount(accountId, setAccount);
  }, [accountId]);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h1">{account.accountName}</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button className="btn btn-sm btn-outline-success">
              <BsCashCoin />
            </button>
            <button className="btn btn-sm btn-outline-danger">
              <RiHandCoinFill />
            </button>
            <button className="btn btn-sm btn-outline-secondary">
              <BiTransfer />
            </button>
          </div>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-lg-4 card text-center">
          <Icon
            customStyle="rounded-icon mt-3"
            iconName={account.accountIcon}
          />
          <h2>{account.accountName}</h2>
          <h3>Amount: {account.currentAmount}</h3>
        </div>
      </div>
    </>
  );
};

export default Account;
