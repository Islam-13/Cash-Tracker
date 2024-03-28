import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/esxpenseApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signUp, isPending } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Signed up successfully. Your will receive a confirm email.",
      );
      navigate("/signin");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signUp, isPending };
}

export default useSignUp;
