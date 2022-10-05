import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <footer className="fixed-top-0 font-mono left-0 z-20 p-4 w-full bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-md text-gray-500 sm:text-center dark:text-gray-400">
          <Link to="/" className=" hover:bg-gray-200">
            Travel-Lite
          </Link>
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link id="home_link" className="mr-4 hover:bg-gray-200 md:mr-6 " to="/">
              Home
            </Link>
          </li>
          <li>
            <Link id="carbon_link" className="mr-4  hover:bg-gray-200 md:mr-6 " to="/carbon">
              Carbon
            </Link>
          </li>
          <li>
            <Link id="facts_link" className="mr-4  hover:bg-gray-200 md:mr-6 " to="/facts">
              Facts
            </Link>
          </li>
          <li>
            <Link id="about_link" className="mr-4  hover:bg-gray-200 md:mr-6 " to="/aboutus">
              About
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default Navigation;
