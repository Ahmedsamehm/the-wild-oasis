import Loading from "../../UI/Loading";
import useGetCabins from "../cabins/useGetCabins";
import ChartGraph from "./ChartGraph";
import GroupList from "./groupList";
import SalesChart from "./SalesChart";
import TodayCheckList from "./TodayCheckList";
import useRecentBooking from "./useRecentBooking";
import useRecentStays from "./useRecentStays";

function DashBoardLayout() {
  const { bookingDate, isLoading: isRecentLoading } = useRecentBooking();
  const { cabins } = useGetCabins();
  const { numDay } = useRecentStays();

  if (isRecentLoading) return <Loading />;
  return (
    <>
      <GroupList bookingDate={bookingDate} cabins={cabins} />
      <div className="grid grid-cols-2 gap-x-[1vw]  space-y-[2svh] ">
        <div className="col-span-2 md:col-span-1 bg-neutral rounded-xl p-[3vw] max-h-[40svh]  md:p-[2vw] lg:p-[1vw]  space-y-[2svh] min-h-[10svh] overflow-auto shadow-xl   ">
          <TodayCheckList />
        </div>
        <div className="col-span-2 md:col-span-1 bg-neutral rounded-xl max-h-[40svh]   ">
          <ChartGraph bookingDate={bookingDate} numDay={numDay} />
        </div>
        <div className="col-span-2  bg-neutral rounded-xl max-h-[40svh]   ">
          <SalesChart numDay={numDay} bookingDate={bookingDate} />
        </div>
      </div>
    </>
  );
}

export default DashBoardLayout;
