import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditExpense } from "../../services/esxpenseApi";
import toast from "react-hot-toast";

function useEditExpense() {
  const queryClient = useQueryClient();

  const { mutate: editExpense, isPending: isEditing } = useMutation({
    mutationFn: ({ data, id }) => createEditExpense(data, id),
    onSuccess: () => {
      toast.success("Expense edited successfully.");
      queryClient.invalidateQueries("expenses");
    },
    onError: (err) => toast.error(err.message),
  });
  return { editExpense, isEditing };
}

export default useEditExpense;
