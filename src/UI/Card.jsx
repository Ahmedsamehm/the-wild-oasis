function Card({ Children, icon }) {
  return (
    <li className="  flex-1  flex basis-full md:basis-auto  items-center bg-neutral text-base-content p-[3vw] md:p-[2vw] lg:p-[1vw] rounded-xl">
      {icon}
      <div className="flex flex-col">
        <p className="text-[1rem] ">Bookings</p>
        <span className="text-[1rem] ">{Children}</span>
      </div>
    </li>
  );
}

export default Card;
