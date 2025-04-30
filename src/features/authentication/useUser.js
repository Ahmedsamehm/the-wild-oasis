import { useQuery } from "@tanstack/react-query";

import { GetCurrentUser } from "../../services/LoginApi";

const useUser = () => {
  const {
    data: user,
    isLoading: userLoading,
    refetch,
  } = useQuery({
    queryKey: ["User"],
    queryFn: GetCurrentUser,
    staleTime: 20000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    user,
    userLoading,
    isAuthenticated: !!user,
    refetch,
  };
};

export default useUser;
