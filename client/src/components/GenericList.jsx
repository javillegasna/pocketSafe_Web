import { Link } from "react-router-dom";
import Icon from "../components/Icon";
const GenericList = ({ list,idFather, actions }) => {
  const renderItem = (list) =>
    list.map((item) => (
      <tr key={`${item.id}`}>
        <td>
          <Icon iconName={item.icon} />
        </td>
        {idFather?<td><Link to={`/${idFather}/${item.id}`} >{item.name}</Link></td>:<td>{item.name}</td>}
        <td>
        <button type="button" onClick={(e)=>actions.edit(item)} className={"btn btn-outline-primary"}>edit</button>
          {" | "}
          <button type="button" onClick={(e)=>actions.delete(item)} className={"btn btn-outline-danger"}>delete</button>
        </td>
      </tr>
    ));
  return (
    <table className="table table-striped table-hover container text-center">
      <thead>
        <tr>
          <th scope="col">Icon</th>
          <th scope="col">Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>{renderItem(list)}</tbody>
    </table>
  );
};
export default GenericList;
