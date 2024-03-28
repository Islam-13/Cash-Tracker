import { useSearchParams } from "react-router-dom";
import Header from "../../ui/Header";
import Loader from "../../ui/Loader";
import useGetExpenses from "../home/useGetExpenses";
import ExpensesChart from "./ExpensesChart";
import CategoriesChart from "./CategoriesChart";

function Data() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { expenses, isLoading } = useGetExpenses();

  if (isLoading) return <Loader />;

  function handleFilter(value) {
    searchParams.set("duration", value);
    setSearchParams(searchParams);
  }

  const numDays = searchParams.get("duration") || "30";

  return (
    <>
      <Header />

      <section className="mx-auto w-[90%] max-w-[850px] space-y-3 p-4">
        <div className="flex items-center justify-between">
          <h2 className=" text-2xl font-bold"> Data</h2>
          <div className=" flex items-center gap-1">
            <span className=" font-semibold">Last</span>
            <div className="space-x-1 rounded-lg border border-green-500 p-1 text-[13px] shadow-md">
              <button
                className={`filter-btn ${numDays === "7" && "active"} text-[13px]`}
                onClick={() => handleFilter("7")}
              >
                7 days
              </button>
              <button
                className={`filter-btn ${numDays === "30" && "active"} text-[13px]`}
                onClick={() => handleFilter("30")}
              >
                30 days
              </button>
              <button
                className={`filter-btn ${numDays === "90" && "active"} text-[13px]`}
                onClick={() => handleFilter("90")}
              >
                90 days
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-2">
          <div className="grow rounded-lg border border-green-500 px-1 py-3">
            <CategoriesChart expenses={expenses} numDays={numDays} />
          </div>
          <div className="grow rounded-lg border border-green-500 px-1 py-3">
            <CategoriesChart expenses={expenses} numDays={numDays} />
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-lg border border-green-500 p-1">
          <ExpensesChart expenses={expenses} numDays={numDays} />
        </div>
      </section>
    </>
  );
}

export default Data;
