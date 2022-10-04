import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import Carbon from "./pages/Carbon";
import AboutUs from "./pages/AboutUs";
import Facts from "./pages/Facts";

function App() {
  // let activeClassName = "nav-active";
  return (
    <>
      <Router>
        <nav className="font-mono">
          <NavLink
            to="/"
            // className={({ isActive }) => isActive && activeClassName}
          >
            Home{" "}
          </NavLink>
          <NavLink
            to="/carbon"
            // className={({ isActive }) => isActive && activeClassName}
          >
            Carbon{" "}
          </NavLink>
          <NavLink
            to="/aboutus"
            // className={({ isActive }) => isActive && activeClassName}
          >
            About us{" "}
          </NavLink>
          <NavLink
            to="/facts"
            // className={({ isActive }) => isActive && activeClassName}
          >
            Facts{" "}
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carbon" element={<Carbon />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/facts" element={<Facts />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
