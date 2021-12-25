import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Nav/dashboard";
import Login from "./components/Nav/login";
import Nav from "./components/Nav/nav";
import { Signup } from "./components/Nav/signup";
import { PATH } from "./constants/nav";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path={PATH.DASHBOARD} element={<Dashboard />} />
        <Route path={PATH.SIGNUP} element={<Signup />} />
        <Route path={PATH.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
