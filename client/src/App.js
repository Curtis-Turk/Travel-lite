import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Carbon from "./pages/Carbon";


function App() {
  let activeClassName = "nav-active";
  return (
    <Router>
    <nav> 
        <NavLink to="/" className={({ isActive }) => isActive && activeClassName}>Home </NavLink>
        <NavLink to="carbon" className={({ isActive }) => isActive && activeClassName}>Carbon </NavLink>
      </nav>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="carbon" element={<Carbon />} />
      </Routes>
    </Router>
  );
}



export default App;