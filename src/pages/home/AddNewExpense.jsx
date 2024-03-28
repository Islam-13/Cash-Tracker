import CreateEditExpenseForm from "../../ui/CreateEditExpenseForm";
import Modal from "../../ui/Modal";

function AddNewExpense() {
  return (
    <div className="text-center">
      <Modal>
        <Modal.Open opens="addExpenseForm">
          <button className="btn primary">Add New Expense</button>
        </Modal.Open>

        <Modal.Window name="addExpenseForm">
          <CreateEditExpenseForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddNewExpense;
