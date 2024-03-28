import { useMutation } from "@tanstack/react-query";
import { updatePassword as updatePasswordApi } from "../../services/esxpenseApi";
import toast from "react-hot-toast";

function useUpdatePassword() {
  const { mutate: updatePassword, isPending: isUpdating } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updatePassword, isUpdating };
}

export default useUpdatePassword;
