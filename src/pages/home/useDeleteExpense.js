import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense as deleteExpenseApi } from "../../services/esxpenseApi";
import toast from "react-hot-toast";

function useDeleteExpense() {
  const queryClient = useQueryClient();
  const { mutate: deleteExpense, isPending: isDeleteing } = useMutation({
    mutationFn: deleteExpenseApi,
    onSuccess: () => {
      toast.success("Expense deleted successfully");
      queryClient.invalidateQueries("expenses");
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteExpense, isDeleteing };
}

export default useDeleteExpense;
