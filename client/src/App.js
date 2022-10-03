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
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

function App() {
  // let activeClassName = "nav-active";
  return (
    <>
      <Router>
        <Navigation />
        
         
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carbon" element={<Carbon />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/facts" element={<Facts />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
