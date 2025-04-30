import CabinsTable from "../features/cabins/CabinsTable";

import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Header from "../UI/Header";

function Cabins() {
  return (
    <>
      <header className="flex flex-col md:flex-row justify-between items-center gap-2 w-full">
        <Header className="w-full md:w-1/3 lg:w-1/4">Cabins</Header>
        <ul className="flex w-full md:w-2/3 lg:w-3/4 items-center gap-2">
          <CabinTableOperations />
        </ul>
      </header>

      <CabinsTable />
    </>
  );
}

export default Cabins;
