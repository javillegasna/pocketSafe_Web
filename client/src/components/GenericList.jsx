import { Link } from "react-router-dom";
import GenericButton from "../components/GenericButton";
import Icon from "../components/Icon";
const GenericList = ({ list,idFather, actions }) => {
  const renderItem = (list) =>
    list.map((item, index) => (
      <tr key={`${item.id}`}>
        <td>
          <Icon iconName={item.icon} />
        </td>
        {idFather?<td><Link to={`/${idFather}/${item.id}`} >{item.name}</Link></td>:<td>{item.name}</td>}
        <td>
          <GenericButton
            action={actions.edit}
            message={"edit"}
            typeStyle={"primary"}
          />
          {" | "}
          <GenericButton
            action={actions.delete}
            message={"delete"}
            typeStyle={"danger"}
          />
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
