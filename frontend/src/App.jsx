import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
//import VisitorQR from "./pages/VisitorQR";
//import Community from "./pages/Community";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;