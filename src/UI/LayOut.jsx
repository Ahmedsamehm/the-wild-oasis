import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

import NavHeader from "./NavHeader";

function LayOut() {
  return (
    <>
      <header className="bg-base-200 p-5 rounded-br-2xl  ">
        <NavHeader />
      </header>
      <div className="flex min-h-screen capitalize">
        <aside>
          <nav className="drawer lg:drawer-open z-1">
            <SideBar />
          </nav>
        </aside>

        <main className="container mx-auto mt-5">
          <section className=" w-full space-y-5 font-bold p-5  ">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
}

export default LayOut;
