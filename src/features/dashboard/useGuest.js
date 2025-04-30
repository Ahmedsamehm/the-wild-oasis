import { useQuery } from "@tanstack/react-query";
import GuestApi from "../../services/GuestApi";

function useGuest() {
  const {
    data: GetGuest,
    isLoading: isGuestLoading,
    error: GuestErr,
  } = useQuery({
    queryKey: ["Guest"],
    queryFn: GuestApi,
    staleTime: 20000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { GetGuest, isGuestLoading, GuestErr };
}

export default useGuest;
