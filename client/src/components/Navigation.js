import React from "react";
import { Link } from "react-router-dom";
import travellitelogo from "../images/travellitelogo.png";

function Navigation() {
  return (
    <>
      <footer className="fixed-top-0 font-mono left-0 z-20 p-4 w-full bg-white border-t border-gray-200 shadow flex justify-center md:flex md:p-4 dark:bg-gray-800 dark:border-gray-600">
          <Link to="/" className="hover:bg-gray-100">
          <img
            className="w-72"
            src={travellitelogo}
            alt="Logo"
          />
          </Link>
      </footer>
    </>
  );
}

export default Navigation;
