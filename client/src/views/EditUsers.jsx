/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
const EditUsers = () => {
  const {userList,setUserList,getUsers,deleteUser} = useContext(UserContext);
  useEffect(() => {
    getUsers(setUserList)
  }, []);
  const renderItem = (list) =>
    list.map((item) => (
      <tr key={`${item._id}`}>
        <td>
          {item.email}
        </td>
        <td>
          {item.roles[0].name}
        </td>
        <td>
        <button type="button" onClick={(e)=>{}} className={"btn btn-outline-primary"}>edit</button>
          {" | "}
          <button type="button" onClick={(e)=>{deleteUser(item._id)}} className={"btn btn-outline-danger"}>delete</button>
        </td>
      </tr>
    ));
  return ( <>
    <table className="table table-striped table-hover container text-center">
      <thead>
        <tr>
          <th scope="col">email</th>
          <th scope="col">roles</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>{renderItem(userList)}</tbody>
    </table>
  </> );
}
 
export default EditUsers;