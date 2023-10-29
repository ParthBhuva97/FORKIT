import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BsUpload } from "react-icons/bs";
import { GrStatusUnknown } from "react-icons/gr";
import { BiLogOutCircle } from "react-icons/bi";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

import Home from "./components/Home/Home";
import Test from "./components/Home/Test";
import Dashboard from "./components/Profile/Dashboard";
import Marketplace from "./components/Marketplace/Marketplace";
import AdminHome from "./components/Admin/AdminHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/profile" element={<Dashboard />}></Route>
        <Route exact path="/marketplace" element={<Marketplace />}></Route>
        <Route exact path="/admin" element={<AdminHome />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
