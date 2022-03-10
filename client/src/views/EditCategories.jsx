import { useContext } from "react";
import UserContext from "../context/UserContext";
import GenericButton from "../components/GenericButton";
import Icon from "../components/Icon";
const EditCategories = () => {
  const { user } = useContext(UserContext);
  const renderItem = (categories) =>
    categories.map((category, index) => (
      <tr key={`Account${index}`}>
        <td>
          <Icon iconName={category.iconName} />
        </td>
        <td>{category.categoryName}</td>
        <td>
          <GenericButton
            action={() => {}}
            message={"edit"}
            typeStyle={"primary"}
          />
          {" | "}
          <GenericButton
            action={() => {}}
            message={"delete"}
            typeStyle={"danger"}
          />
        </td>
      </tr>
    ));
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h1">EditAccounts</h1>
      </div>
      <table className="table table-striped table-hover container text-center">
        <thead>
          <tr>
            <th scope="col">Icon</th>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>{renderItem(user.categories)}</tbody>
      </table>
    </>
  );
};

export default EditCategories;
