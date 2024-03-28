import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/esxpenseApi";
import toast from "react-hot-toast";

function useUpdateUserData() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserData,
    onSuccess: ({ user }) => {
      toast.success("Account updated Successfully");
      //   queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries("user");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}

export default useUpdateUserData;
