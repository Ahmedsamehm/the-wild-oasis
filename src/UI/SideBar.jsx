import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Logout } from "../services/LoginApi";
import {
  CalendarDays,
  DoorClosed,
  House,
  Icon,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import Logo from "../assets/logo-dark.png";
function SideBar() {
  const [activeIndex, setActiveIndex] = useState(null);

  const links = [
    {
      name: "DashBoard",
      to: "/",
      Icon: <House />,
    },
    {
      name: "Booking",
      to: "Booking",
      Icon: <CalendarDays />,
    },
    {
      name: "Cabins",
      to: "Cabins",
      Icon: <DoorClosed />,
    },
    {
      name: "Setting",
      to: "setting",
      Icon: <Settings />,
    },
    {
      name: "Users",
      to: "Users",
      Icon: <User />,
    },
    {
      name: "Logout",
      to: "Login",
      onClick: () => {
        Logout();
      },
      Icon: <LogOut />,
    },
  ];

  return (
    <>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* min-w-[60vw] md:min-w-[35vw] lg:min-w-[20vw] */}
        <ul className="menu bg-base-200 text-base-content  size-60 md:size-70  lg:size-55 xl:size-70 2xl:size-100  min-h-screen p-2">
          <img
            src={Logo}
            className="bg-cover object-contain size-40 mx-auto"
            alt="Logo"
          />
          {links.map((Link, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={Link.to}
                  className={({ isActive }) =>
                    `py-3 ${isActive ? "bg-base-300 font-medium" : ""} text-md 2xl:text-xl`
                  }
                  onClick={() => {
                    setActiveIndex(index);
                    if (Link.onClick) Link.onClick();
                  }}
                >
                  <span className={`${activeIndex === index && "text-info"}`}>
                    {Link?.Icon}
                  </span>
                  <span className="py-2 md:py-1">{Link.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default React.memo(SideBar);
