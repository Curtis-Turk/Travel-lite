import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";

function App() {
  let activeClassName = "nav-active";
  return (
    <Router>
    <nav> 
        <NavLink to="/" className={({ isActive }) => isActive && activeClassName}>Home </NavLink>
        <NavLink to="form" className={({ isActive }) => isActive && activeClassName}>Form </NavLink>
      </nav>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="form" element={<Form />} />
      </Routes>
    </Router>
  );
}



export default App;