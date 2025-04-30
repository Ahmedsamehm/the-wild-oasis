import { useState } from "react";
import useCheckIn from "./useCheckin";
import useCheckOut from "./useCheckOut";

function useCheckInActions(BookFound, idBooking, Setting) {
  // States
  const [payConfirm, setPayConfirm] = useState(false);
  const [breakfastConfirm, setBreakfastConfirm] = useState(false);

  // Hooks
  const { checkInFunc, isCheckLoading } = useCheckIn();
  const { CheckOutFunc, CheckOutLoading } = useCheckOut();

  // Extract data
  const { numNights, numGuests, totalPrice } = BookFound || {};

  // Calculate breakfast data
  const setting = Setting?.find((setting) => setting.id === 1);
  const breakfastPrice = setting ? setting.breakfastPrice : 0;
  const totalBreakfast = breakfastPrice * numNights * numGuests;

  // Define event handlers
  const handlePay = () => {
    setPayConfirm(!payConfirm);
  };

  const handleBreakfast = () => {
    setBreakfastConfirm(!breakfastConfirm);
  };

  // Prepare breakfast data for API
  const breakfastData = {
    hasBreakfast: true,
    extrasPrice: totalBreakfast,
    totalPrice: totalPrice + totalBreakfast,
  };

  // Check-in/Check-out handlers
  const handleCheckIn = () => {
    if (breakfastConfirm) {
      checkInFunc({
        idBooking,
        breakfast: breakfastData,
      });
    }
  };

  const handleCheckOut = () => {
    CheckOutFunc(idBooking);
  };

  return {
    // States
    payConfirm,
    breakfastConfirm,

    // Loading states
    isCheckLoading,
    CheckOutLoading,

    // Data
    totalBreakfast,

    // Event handlers
    handlePay,
    handleBreakfast,
    handleCheckIn,
    handleCheckOut,
  };
}

export default useCheckInActions;
