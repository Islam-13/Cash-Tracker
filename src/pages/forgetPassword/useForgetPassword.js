import { useMutation } from "@tanstack/react-query";
import { forgetPassword } from "../../services/esxpenseApi";
import toast from "react-hot-toast";

function useForgetPassword() {
  const { mutate: forgetPass, isPending } = useMutation({
    mutationFn: forgetPassword,
    onError: (err) => toast.error(err.message),
  });

  return { forgetPass, isPending };
}

export default useForgetPassword;
