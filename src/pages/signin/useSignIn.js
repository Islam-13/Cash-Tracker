import { useMutation } from "@tanstack/react-query";
import { signIn as signInApi } from "../../services/esxpenseApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useSignIn() {
  const navigate = useNavigate();
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: signInApi,
    onSuccess: (data) => {
      toast.success("Signed in successfully!");
      navigate("/");
      localStorage.setItem("userId", data.user.id);
    },
    onError: (err) => toast.error(err.message),
  });

  return { signIn, isPending };
}

export default useSignIn;
