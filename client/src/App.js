import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import Carbon from "./pages/Carbon";

function App() {
  let activeClassName = "nav-active";
  return (
    <>
      <Router>
        <nav>
          <ul>
            <li>
              {" "}
              <NavLink
                to="/"
                className={({ isActive }) => isActive && activeClassName}
              >
                Home{" "}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/carbon"
                className={({ isActive }) => isActive && activeClassName}
              >
                Carbon{" "}
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carbon" element={<Carbon />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
