import { getCabins } from "../../services/CabinsApi";
import { useQuery } from "@tanstack/react-query";

function useGetCabins() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,

    staleTime: 20000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    cabins,
    isLoading,
    error,
  };
}

export default useGetCabins;
