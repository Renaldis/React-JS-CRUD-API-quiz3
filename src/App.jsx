import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import ManageData from "./Pages/ManageData";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-data" element={<ManageData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
