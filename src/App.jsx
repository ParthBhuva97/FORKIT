import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Test from "./components/Home/Test";
import Dashboard from "./components/Profile/Dashboard";
import Marketplace from "./components/Marketplace/Marketplace";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/profile" element={<Dashboard />}></Route>
        <Route exact path="/marketplace" element={<Marketplace />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
