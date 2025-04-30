import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../../services/SettingApi";
import { useParams } from "react-router-dom";

const useGetSetting = () => {
  const { idBooking } = useParams();
  const {
    isLoading,
    error,
    data: Setting,
    isPending,
  } = useQuery({
    queryKey: ["Settings", idBooking],
    queryFn: getSetting,
    staleTime: 20000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { isLoading, error, Setting, isPending };
};

export default useGetSetting;
