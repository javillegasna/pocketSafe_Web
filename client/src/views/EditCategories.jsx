import { useContext } from "react";
import UserContext from "../context/UserContext";
import GenericList from "../components/GenericList";
const EditCategories = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h1">EditAccounts</h1>
      </div>

      <GenericList
        list={user.categories.map((el) => ({
          id: el._id,
          name: el.categoryName,
          icon: el.iconName,
        }))}
        actions={{
          edit: ()=>console.log("editing"),
          delete:()=> console.log("deleting"),
        }}
        idFather={user._id}
      />
    </>
  );
};

export default EditCategories;
