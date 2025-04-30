import React from "react";

function Header({ children, className }) {
  return (
    <h1
      className={`${className} text-xl sm:text-2xl md:text-xl lg:text-2xl font-bold`}
    >
      {children}
    </h1>
  );
}

export default Header;
