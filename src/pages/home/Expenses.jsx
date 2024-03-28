import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import ExpenseItem from "./ExpenseItem";
import Progressbar from "./Progressbar";

function Expenses({ expenses, isLoading, totalPrice }) {
  if (isLoading) return;

  return (
    <Menus>
      {expenses.length > 0 ? (
        <>
          <div className="mx-auto w-[94%] max-w-[700px] rounded-lg px-5">
            <Progressbar totalPrice={totalPrice} />
          </div>

          <div className="mx-auto w-[94%] max-w-[700px] overflow-auto rounded-lg border border-green-500 px-5 py-2">
            {expenses.map((exp) => (
              <ExpenseItem key={exp.id} expense={exp} />
            ))}
          </div>
        </>
      ) : (
        <Empty />
      )}
    </Menus>
  );
}

export default Expenses;
