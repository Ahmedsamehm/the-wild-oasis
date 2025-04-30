import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

import NavHeader from "./NavHeader";

function LayOut() {
  return (
    <>
      <header className="bg-base-200 p-[3vh] rounded-br-2xl  ">
        <NavHeader />
      </header>
      <div className="flex min-h-svh capitalize">
        <aside>
          <nav className="drawer lg:drawer-open z-1">
            <SideBar />
          </nav>
        </aside>

        <main className="container mx-auto mt-5">
          {/* <section className="max-w-[90vw] xl:max-w-[70vw] mx-auto space-y-[2vh] font-bold p-[1vw] md:p-[3vw] lg:p-[1vw]">
            <Outlet />
          </section> */}
          <section className="w-full md:w-5/5   mx-auto space-y-[2vh] font-bold p-5  ">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
}

export default LayOut;
