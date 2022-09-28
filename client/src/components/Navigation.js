import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/carbon">Carbon</Link>
    </li>
  </nav>
  )
}

export default Navigation;
