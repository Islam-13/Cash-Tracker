import Container from "../../ui/Container";
import Loader from "../../ui/Loader";
import AddNewExpense from "./AddNewExpense";
import Expenses from "./Expenses";
import useGetExpenses from "./useGetExpenses";
import Header from "../../ui/Header";
import Empty from "../../ui/Empty";

function Home() {
  const { expenses = [], isLoading } = useGetExpenses();

  if (isLoading) return <Loader />;

  return (
    <div className="home-screen">
      <Header />

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
