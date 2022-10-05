import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Carbon from "./pages/Carbon";
import AboutUs from "./pages/AboutUs";
import Facts from "./pages/Facts";
import Error from "./pages/Error";
import Sources from "./pages/Sources";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
// import Spinner from 'react-bootstrap/Spinner';

function App() {
  return (
    <>
      <Router>
        {/* Nav Bar */}
        <Navigation />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carbon" element={<Carbon />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/facts" element={<Facts />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/error" element={<Error />} />
        </Routes>

        {/* Footer */}
        <br></br>
        <Footer />
      </Router>
    </>
  );
}

export default App;
