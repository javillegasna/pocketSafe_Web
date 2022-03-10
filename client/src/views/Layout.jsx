import { useContext, useEffect } from "react";
import axios from "axios";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
//Context
import ConfigState from "../context/ConfigState";
import UserContext from "../context/UserContext";
const Layout = ({ render }) => {
  //Context
  const { setUser, user } = useContext(UserContext);
  useEffect(() => {
    const data = localStorage.getItem("CurrentUser");
    if (data)  setUser(JSON.parse(data));
    const token = localStorage.getItem("CurrentToken");
    if (token) axios.defaults.headers.common['x-access-token']=JSON.parse(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {user && (
        <>
          <Header />
          <SideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <ConfigState>{render}</ConfigState>
          </main>
        </>
      )}
    </>
  );
};
export default Layout;
