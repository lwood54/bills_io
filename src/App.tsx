import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Nav/dashboard";
import Login from "./components/Nav/login";
import Nav from "./components/Nav/nav";
import { Signup } from "./components/Nav/signup";
import { PATH } from "./constants/nav";
import BillAdd from "./pages/bills/bill-add";
import BillEdit from "./pages/bills/bill-edit";
import BillsPage from "./pages/bills/bills";
import BillsList from "./pages/bills/bills-list";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path={PATH.DASHBOARD} element={<Dashboard />} />
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
