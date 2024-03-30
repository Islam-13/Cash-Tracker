import { useState } from "react";
import { format } from "date-fns";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import Loader from "../../ui/Loader";
import Menus from "../../ui/Menus";
import ExpenseItem from "./ExpenseItem";
import Container from "../../ui/Container";
import TotalExpenses from "./TotalExpenses";
import Progressbar from "./Progressbar";

function Expenses({ expenses, isLoading }) {
  const dates = [
    ...new Set(expenses?.map((expense) => expense.date.slice(0, 7))),
  ];

  const sortedDates = dates.sort((date1, date2) => {
    const year1 = parseInt(date1.split("-")[0], 10);
    const month1 = parseInt(date1.split("-")[1], 10);
    const year2 = parseInt(date2.split("-")[0], 10);
    const month2 = parseInt(date2.split("-")[1], 10);

    // Sort by year first
    if (year1 !== year2) {
      return year1 - year2;
    }

    // If years are equal, sort by month
    return month1 - month2;
  });

  const [index, setIndex] = useState(sortedDates.length - 1);

  if (isLoading) return <Loader />;

  function handleRightBtn() {
    index === sortedDates.length - 1 ? setIndex(0) : setIndex((i) => i + 1);
  }

  function handleLeftBtn() {
    index === 0 ? setIndex(sortedDates.length - 1) : setIndex((i) => i - 1);
  }

  const currentMonth = sortedDates.at(index);

  const filteredExpenses = expenses.filter(
    (expense) => expense.date.slice(0, 7) === currentMonth,
  );

  const totalPrice = filteredExpenses.reduce(
    (acc, curr) => acc + curr.price,
    0,
  );

  return (
    <Menus>
      <Progressbar totalPrice={totalPrice} key={totalPrice} />

      <div className="mx-auto w-[94%] max-w-[700px] overflow-auto rounded-lg border border-green-500 px-5 pb-2">
        <div className="sticky top-0 z-10 mb-2 flex items-center justify-between border-b border-green-500 bg-white px-2 py-2">
          <button onClick={handleLeftBtn}>
            <div className="flex aspect-[1] w-[25px] items-center justify-center rounded-2xl bg-stone-300 text-xl">
              <GrFormPrevious />
            </div>
          </button>
          <p className=" font-semibold text-stone-400">
            {currentMonth ? format(currentMonth, "MMMM yyyy") : setIndex(0)}
          </p>
          <button onClick={handleRightBtn}>
            <div className="flex aspect-[1] w-[25px] items-center justify-center rounded-2xl bg-stone-300 text-xl">
              <GrFormNext />
            </div>
          </button>
        </div>

        {filteredExpenses?.map((exp) => (
          <ExpenseItem key={exp.id} expense={exp} />
        ))}
      </div>

      <Container>
        <TotalExpenses totalPrice={totalPrice} />
      </Container>
    </Menus>
  );
}

export default Expenses;
