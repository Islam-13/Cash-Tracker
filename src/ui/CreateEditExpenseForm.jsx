import { useForm } from "react-hook-form";
import useCreateExpense from "../pages/home/useCreateExpense";
import useEditExpense from "../pages/home/useEditExpense";
import LoaderMini from "./LoaderMini";

function CreateEditExpenseForm({ onCloseModal, expenseToEdit = {} }) {
  const { createExpense, isCreating } = useCreateExpense();
  const { editExpense, isEditing } = useEditExpense();
  const { id: editId, ...editValues } = expenseToEdit;
  const editSession = Boolean(editId);
  const isWorking = isCreating || isEditing;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: editSession ? editValues : "" });

  function onSubmit(data) {
    if (editSession) {
      editExpense({ data, id: editId }, { onSuccess: onCloseModal });
    } else createExpense(data, { onSuccess: onCloseModal });
  }

  return (
    <form className="formStyle" onSubmit={handleSubmit(onSubmit)}>
      <div className="formRow">
        <label htmlFor="date" className="sm:basis-24">
          Date
        </label>
        <div className="relative grow">
          <input
            type="date"
            id="date"
            className="input"
            {...register("date", {
              required: "Date is required!!",
            })}
          />

          {errors.date && (
            <p className="absolute left-2 top-[46px] rounded-sm bg-red-200 px-2 text-sm text-red-700">
              {errors.date.message}
            </p>
          )}
        </div>
      </div>

      <div className="formRow">
        <label htmlFor="title" className="sm:basis-24">
          Title
        </label>
        <div className="relative grow">
          <input
            type="text"
            id="title"
            className="input"
            {...register("title", {
              required: "Title is required!!",
              minLength: { value: 3, message: "minimum 3 chars" },
            })}
          />

          {errors.title && (
            <p className=" absolute left-2 top-[46px] rounded-sm bg-red-200 px-2 text-sm text-red-700">
              {errors.title.message}
            </p>
          )}
        </div>
      </div>

      <div className="formRow">
        <label htmlFor="price" className="sm:basis-24">
          Price
        </label>
        <div className="relative grow">
          <input
            type="number"
            id="price"
            className="input"
            {...register("price", {
              required: "Price is required!!",
            })}
          />

          {errors.price && (
            <p className=" absolute left-2 top-[46px] rounded-sm bg-red-200 px-2 text-sm text-red-700">
              {errors.price.message}
            </p>
          )}
        </div>
      </div>

      <div className="formRow">
        <label htmlFor="category" className="sm:basis-24">
          Category
        </label>
        <div className="relative grow">
          <select
            id="category"
            className="input"
            {...register("category", {
              required: "Category is required!!",
            })}
          >
            <option value="🧰 Car">car</option>
            <option value="📚 Education">education</option>
            <option value="⛽ Gas">gas</option>
            <option value="🛒 Groceries">groceries</option>
            <option value="🏋🏼‍♂️ gym">gym</option>
            <option value="💉 Health">health care</option>
            <option value="🍽 Restaurants">restaurants</option>
            <option value="🛍 Shopping">shopping</option>
            <option value="Others">others</option>
          </select>

          {errors.category && (
            <p className=" absolute left-2 top-[46px] rounded-sm bg-red-200 px-2 text-sm text-red-700">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      <input
        type="hidden"
        {...register("userId")}
        defaultValue={localStorage.getItem("userId")}
      />

      <div className="flex items-center justify-end gap-3">
        <button type="reset" onClick={onCloseModal} className="btn cancel">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isWorking}
          className="btn secondary m-[inherit]"
        >
          {isWorking && <LoaderMini />} {editSession ? "Edit" : "Add Expense"}
        </button>
      </div>
    </form>
  );
}

export default CreateEditExpenseForm;
