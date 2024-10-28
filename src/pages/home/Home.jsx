import Container from "../../ui/Container";
import Loader from "../../ui/Loader";
import AddNewExpense from "./AddNewExpense";
import Expenses from "./Expenses";
import useGetExpenses from "./useGetExpenses";
import Empty from "../../ui/Empty";

function Home() {
  const { expenses = [], isLoading } = useGetExpenses();

  if (isLoading) return <Loader />;

  return (
    <div className="flex h-[calc(100vh-62px)] flex-col gap-4 py-4">
      {expenses.length > 0 ? (
        <Expenses expenses={expenses} isLoading={isLoading} />
      ) : (
        <Empty />
      )}

      <Container>
        <AddNewExpense />
      </Container>
    </div>
  );
}

export default Home;
