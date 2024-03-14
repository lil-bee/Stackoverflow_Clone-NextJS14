import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav className="flex-center">
        <ul className="flex-center gap-3">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/About">About</a>
          </li>
          <li>
            <a href="/Contact">contact</a>
          </li>
          <li>
            <a href="/project">My Projects</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
