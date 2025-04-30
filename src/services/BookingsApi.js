import supabase from "./subabase";

import { Page_Number } from "../constants";
import GetToday from "./getToday";

const getBooking = async (page = 1) => {
  const start = (page - 1) * Page_Number;
  const end = start + Page_Number - 1;

  let query = supabase
    .from("Booking")
    .select("*", { count: "exact" })
    .range(start, end);

  const { data, error, count } = await query;


  if (error) {
    console.error(error);
    throw new Error("Booking could not be loaded");
  } else {
    return { data, count };
  }
};

const updateBookingStatus = async (id, obj) => {
  const { data, error } = await supabase
    .from("Booking")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  } else {
    return data;
  }
};

const deleteBooking = async (id) => {
  const { error, data } = await supabase.from("Booking").delete().eq("id", id);

  if (error) {
    throw new Error("Booking could not be deleted");
  } else {
    return data;
  }
};

const getBookingAfterDate = async (date, limit) => {
  const { data, error } = await supabase
    .from("Booking")
    .select("created_at, totalPrice, extrasPrice, status,numNights")
    .gte("created_at", date)
    .lte("created_at", GetToday({ end: true }))
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error("Booking could not be loaded");
  }

  return data;
};
export { getBooking, updateBookingStatus, deleteBooking, getBookingAfterDate };
