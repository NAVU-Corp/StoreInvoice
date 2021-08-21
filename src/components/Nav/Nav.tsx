import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/test">Test</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
      </ul>
    </div>
  );
};
