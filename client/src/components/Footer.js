import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="flex flex-col mt-auto w-full  bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <Link to="/" className="hover:bg-gray-200">
            Travel-Lite
          </Link>
          . All Rights Reserved.
        </span>
      </footer>
    </>
  );
}

export default Footer;
