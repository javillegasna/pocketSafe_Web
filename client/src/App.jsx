import "./scss/dashboard.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserState from "./context/UserEstate";
//Components
import Home from "./views/Home";
import Login from "./views/Login";
import Layout from "./views/Layout";
import EditCategories from "./views/EditCategories";
import EditAccounts from "./views/EditAccounts";
function App({render}) {
  return (
    <BrowserRouter>
      <UserState>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/:userId/" >
            <Route path="home" element={<Layout render={<Home />} />} />
            <Route path="accounts" element={<Layout render={<EditAccounts/>} />} />
            <Route path="categories" element={<Layout render={<EditCategories />} />} />
          </Route>
        </Routes>
      </UserState>
    </BrowserRouter>
  );
}

export default App;
