import Container from "../../ui/Container";
import Loader from "../../ui/Loader";
import AddNewExpense from "./AddNewExpense";
import Expenses from "./Expenses";
import TotalExpenses from "./TotalExpenses";
import useGetExpenses from "./useGetExpenses";
import Header from "../../ui/Header";

function Home() {
  const { expenses = [], isLoading } = useGetExpenses();

  if (isLoading) return <Loader />;

  const totalPrice = expenses.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="home-screen">
      <Header />

      <Expenses
        expenses={expenses}
        isLoading={isLoading}
        totalPrice={totalPrice}
      />

      {expenses.length > 0 && (
        <Container>
          <TotalExpenses totalPrice={totalPrice} />
        </Container>
      )}

      <Container>
        <AddNewExpense />
      </Container>
    </div>
  );
}

export default Home;
