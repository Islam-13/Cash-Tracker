import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/esxpenseApi";

function useGetLoggedinUser(enabled) {
  const { data: user, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
    enabled,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}

export default useGetLoggedinUser;
