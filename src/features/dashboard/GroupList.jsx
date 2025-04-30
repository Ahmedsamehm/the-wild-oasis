import React from "react";
import {
  BriefcaseBusiness,
  Calendar,
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
} from "lucide-react";
import useRecentStays from "./useRecentStays";
import Card from "../../UI/Card";
function GroupList({ bookingDate, cabins }) {
  const { Stays, numDay } = useRecentStays();
  const numBooking = bookingDate?.length;

  const Sales = bookingDate?.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const CheckIn = Stays?.length;

  const Occupancy =
    Stays?.reduce((acc, cur) => acc + cur?.numNights, 0) /
    (numDay * cabins?.length);

  return (
    <ul className="flex flex-wrap gap-2 md:gap-4 lg:gap-8 items-center justify-center">
      <Card
        icon={<BriefcaseBusiness className="w-8 h-8 mr-4 shrink-0" />}
        Children={numBooking}
      />
      <Card
        icon={<CircleDollarSign className="w-8 h-8 mr-4 shrink-0" />}
        Children={`$ ${Sales}`}
      />
      <Card
        icon={<Calendar className="w-8 h-8 mr-4 shrink-0" />}
        Children={CheckIn}
      />
      <Card
        icon={<ChartNoAxesColumnIncreasing className="w-8 h-8 mr-4 shrink-0" />}
        Children={Math.round(Occupancy * 100)}
      />
    </ul>
  );
}

export default GroupList;
