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
        <ul className="menu bg-base-200 text-base-content min-h-svh min-w-[60vw] md:min-w-[35vw] lg:min-w-[20vw] p-2">
          <img
            src="/public/logo-dark.png"
            className="bg-cover object-contain size-40 md:size-40 mx-auto"
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
