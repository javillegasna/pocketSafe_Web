import { useContext, useEffect } from "react";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
//Context
import UserContext from "../context/UserContext";
const Layout = ({ render }) => {
  //Context
  const { setUser, user } = useContext(UserContext);
  useEffect(() => {
    const data = localStorage.getItem("CurrentUser");
    if (data) {
      setUser(JSON.parse(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {user && (
        <>
          <Header />
          <SideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {render}
          </main>
        </>
      )}
    </>
  );
};
export default Layout;
