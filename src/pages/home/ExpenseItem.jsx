import { format } from "date-fns";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateEditExpenseForm from "../../ui/CreateEditExpenseForm";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import useDeleteExpense from "./useDeleteExpense";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";

function ExpenseItem({ expense }) {
  const { deleteExpense, isDeleteing } = useDeleteExpense();
  const { id, date, title, price, category } = expense;

  return (
    <Modal>
      <div className="mb-2 rounded-lg bg-[#CAF3D1] px-2 pb-3 pt-1 sm:px-4">
        <div className="flex items-center justify-between">
          <p className=" text-sm text-stone-400">
            {format(date, "dd MMMM yyyy")}
          </p>
          <div className="relative">
            <Menus.ToggleBtn id={id} />

            <Menus.List id={id}>
              <Modal.Open opens="edit-form">
                <Menus.Button>
                  <RiEditLine />
                  Edit
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-expense">
                <Menus.Button>
                  <RiDeleteBinLine />
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-form">
              <CreateEditExpenseForm expenseToEdit={expense} />
            </Modal.Window>

            <Modal.Window name="delete-expense">
              <ConfirmDelete
                fn={deleteExpense}
                fnLoad={isDeleteing}
                id={id}
                resourceName={"delete expense"}
              />
            </Modal.Window>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[15px] font-semibold tab:text-[17px]">
          <p className="basis-[7.75rem]">{title}</p>
          <p>{category}</p>
          <p className="ms-auto">{price} SAR</p>
        </div>
      </div>
    </Modal>
  );
}

export default ExpenseItem;
