import Filter from "../UI/Filter";
import Header from "../UI/Header";

import DashBoardLayout from "../features/dashboard/DashDashBoardLayout";

function DashBoard() {
  return (
    <>
      <header className="flex flex-col md:flex-row justify-between items-center gap-2 w-full">
        <Header className="w-full md:w-1/3 lg:w-1/4">Dashboard</Header>
        <div className="flex w-full md:w-2/3 lg:w-3/4">
          <Filter
            filterField="Last"
            options={[
              { value: "7", label: "Last 7 days" },
              { value: "30", label: "Last 30 days" },
              { value: "90", label: "Last 90 days" },
            ]}
          />
        </div>
      </header>
      {/* card section */}

      <DashBoardLayout />
    </>
  );
}

export default DashBoard;
