import { Route, Routes } from "react-router-dom";
import Home from "./components/Nav/home";
import Login from "./components/Nav/login";
import Nav from "./components/Nav/nav";
import { Signup } from "./components/Nav/signup";
import { PATH } from "./constants/nav";
import BillAdd from "./pages/bills/bill-add";
import BillEdit from "./pages/bills/bill-edit";
import BillsPage from "./pages/bills/bills";
import BillsList from "./pages/bills/bills-list";
import Profile from "./pages/profile/profile";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.SIGNUP} element={<Signup />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.bills.ROOT} element={<BillsPage />}>
          <Route path={PATH.bills.ADD} element={<BillAdd />} />
          <Route path={PATH.bills.VIEW} element={<BillsList />} />
          <Route path={PATH.bills.EDIT} element={<BillEdit />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
