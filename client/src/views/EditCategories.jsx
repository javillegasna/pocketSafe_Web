import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import GenericList from "../components/GenericList";
import ConfigContext from "../context/ConfigContext";
import ModalGrid from "../components/ModalGrid";
import Icon from "../components/Icon";
import * as FontAwesome from "react-icons/fa";
import { modelCategory } from "../utils/models";
const EditCategories = () => {
  //context
  const { user, setUser, putUser } = useContext(UserContext);
  //states

  const { postCategory, deleteCategory, putCategory } = useContext(ConfigContext);
  const [frmOpen, setFrmOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formCategory, setFormCategory] = useState(modelCategory);
  //handlers
  const handlerSubmit = (e) => {
    e.preventDefault();
    const action = editing
      ? putCategory(formCategory._id, formCategory)
      : postCategory(formCategory);
    action
      .then((categoryList) => {
        const { categories } = user;
        return putUser(user._id, {
          ...user,
          categories: editing ? categories : [...categories, categoryList],
        });
      })
      .then((user) => {
        setUser(user);
        localStorage.setItem("CurrentUser", JSON.stringify(user));
        setFrmOpen(false);
        setEditing(false);
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 className="h1">Edit Categories</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button
            onClick={() => {
              setEditing(false);
              setFormCategory(modelCategory);
              setFrmOpen(!frmOpen);
            }}
            className="btn btn-sm btn-outline-secondary "
          >
            <Icon
              iconName={frmOpen ? "FaRegMinusSquare" : "FaRegPlusSquare"}
              message={frmOpen ? "Close" : "New"}
            />
          </button>
        </div>
      </div>
      {frmOpen && (
        <form
          onSubmit={handlerSubmit}
          className="content-form card card-form mb-3"
        >
          <button
            onClick={() => setModalOpen(true)}
            type="button"
            className=" btn btn-outline-secondary form-button text-center mt-2"
          >
            <Icon
              customStyle={"rounded-icon"}
              iconName={formCategory.iconName}
            />
          </button>

          <fieldset className="form-floating m-2">
            <input
              id="floatingInput"
              className="form-control"
              placeholder="Account Name"
              type="text"
              value={formCategory.categoryName}
              onChange={(e) =>
                setFormCategory({ ...formCategory, categoryName: e.target.value })
              }
            />
            <label htmlFor="floatingInput">Category Name:</label>
          </fieldset>
          <button className="btn btn-dark form-button" type="submit">
            Sign in
          </button>
        </form>
      )}
      <GenericList
        list={user.categories.map((el) => ({
          id: el._id,
          name: el.categoryName,
          icon: el.iconName,
        }))}
        actions={{
          edit: (item) => {
            setFormCategory({
              ...formCategory,
              _id: item.id,
              categoryName: item.name,
              iconName: item.icon,
            });
            setEditing(true);
            setFrmOpen(true);
          },
          delete: (item) => {
            deleteCategory(item.id, user._id)
              .then((user) => {
                localStorage.setItem("CurrentUser", JSON.stringify(user));
                setUser(user);
              })
              .catch((err) => console.log(err));
          },
        }}
      />
      {(
        <ModalGrid
          listIcons={Object.keys(FontAwesome)}
          action={(icon) => {
            setFormCategory({...formCategory, iconName:icon});
            setModalOpen(false);
          }}
          visible={modalOpen}
          close={()=>{setModalOpen(false)}}
        />
      )}
    </>
  );
};

export default EditCategories;
