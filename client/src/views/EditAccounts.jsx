
  import { Link} from "react-router-dom";
  import { useContext } from "react";
  import UserContext from "../context/UserContext";
  import GenericButton from "../components/GenericButton";
import Icon from "../components/Icon";

  const EditAccounts = () => {

  const { user } = useContext(UserContext);
  const renderItem = (accounts) =>
    accounts.map((account, index) => (
      <tr key={`Account${index}`}>
        <td> <Icon iconName={account.accountIcon}/> </td>
        <td><Link to={`/${user._id}/${account._id}`}>{account.accountName}</Link></td>
        <td>
          <GenericButton action={()=>{}} message={"edit"} typeStyle={"primary"}/>
          {" | "}
          <GenericButton action={()=>{}} message={"delete"} typeStyle={"danger"}/>
        </td>
      </tr>
    ));
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h1">EditAccounts</h1>
      </div>
      <table className="table table-striped table-hover container text-center" >
      <thead>
        <tr>
          <th scope="col">Icon</th>
          <th scope="col">Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>{renderItem(user.accounts)}</tbody>
    </table>
    </>
  );
};

export default EditAccounts;
