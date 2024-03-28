import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditExpense } from "../../services/esxpenseApi";
import toast from "react-hot-toast";

function useCreateExpense() {
  const queryClient = useQueryClient();

  const { mutate: createExpense, isPending: isCreating } = useMutation({
    mutationFn: createEditExpense,
    onSuccess: () => {
      toast.success("Expense added successfully.");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createExpense, isCreating };
}

export default useCreateExpense;
