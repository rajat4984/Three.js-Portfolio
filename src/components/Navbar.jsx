import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-around p-8">
      <a className="hover:text-[#4af626] transition ease-in-out" href="#">
        About
      </a>
      <a className="hover:text-[#4af626] transition ease-in-out" href="#">
        Projects
      </a>
      <a className="hover:text-[#4af626] transition ease-in-out" href="#">
        Contact
      </a>
    </nav>
  );
};

export default Navbar;
