import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./component/pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./component/pages/SignUp";
import Home from "./component/pages/Home";
import AllProduct from "./component/pages/AllProduct";
import SingleRoom from "./component/pages/SingleRoom";
import DoubleRoom from "./component/pages/DoubleRoom";
import KingRoom from "./component/pages/KingRoom";
import QueenRoom from "./component/pages/QueenRoom";
import RegistrationForm from "./component/pages/RegistrationForm";
import AdminPage from "./component/pages/AdminPage";
import CreateRoom from "./component/module/Admin/CreateRoom";
import AdminRoom from "./component/module/Admin/AdminRoom";
import Booked from "./component/module/Admin/Booked";
import CustomerHistory from "./component/pages/CustomerHistory";
import GuestSignUp from "./component/pages/GuestSignUp";
import GuestLogin from "./component/pages/GuestLogin";
function App() {
  const [view, setView] = useState(true);

  useEffect(() => {
    let value = localStorage.getItem("role");
    if (value === "1") {
      setView(false);
    } else {
      setView(true);
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/GuestSignUp" element={<GuestSignUp />} />
          <Route path="/GuestLogin" element={<GuestLogin />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AllProduct" element={<AllProduct />} />
          <Route path="/SingleRoom" element={<SingleRoom />} />
          <Route path="/DoubleRoom" element={<DoubleRoom />} />
          <Route path="/KingRoom" element={<KingRoom />} />
          <Route path="/QueenRoom" element={<QueenRoom />} />
          <Route path="/RegistrationForm" element={<RegistrationForm />} />
          {view && <Route path="/AdminPage" element={<AdminPage />} />}
          {view && <Route path="/CreateRoom" element={<CreateRoom />} />}
          {view && <Route path="/AdminRoom" element={<AdminRoom />} />}
          {view && <Route path="/Booked" element={<Booked />} />}
          {view && (
            <Route path="/CustomerHistory" element={<CustomerHistory />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
