import CabinsTable from "../features/cabins/CabinsTable";

import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Header from "../UI/Header";

function Cabins() {
  return (
    <>
      <header className="flex flex-col md:flex-row justify-between items-center gap-2 w-full">
        <Header className="w-full md:w-xs lg:w-sm">Cabins</Header>
        <ul className="flex w-full  md:max-lg:max-w-2xl gap-2">
          <CabinTableOperations />
        </ul>
      </header>

      <CabinsTable />
    </>
  );
}

export default Cabins;
