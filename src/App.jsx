import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Card from "./components/Card";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/test" element={<Card />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
