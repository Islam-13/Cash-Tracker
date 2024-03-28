import { format, subDays } from "date-fns";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function CategoriesChart({ expenses, numDays }) {
  const start = subDays(new Date(), numDays - 1);

  const filteredExpenses = expenses?.filter(
    (expense) =>
      expense.date >= format(start, "yyyy-MM-dd") &&
      expense.date <= format(new Date(), "yyyy-MM-dd"),
  );

  const data = [
    {
      category: "Car",
      value: filteredExpenses
        ?.filter((expense) => expense.category === "🧰 Car")
        .reduce((acc, curr) => acc + curr.price, 0),
      color: "#ef4444",
    },
    {
      category: "Education",
      value: filteredExpenses
        ?.filter((expense) => expense.category === "📚 Education")
        .reduce((acc, curr) => acc + curr.price, 0),
      color: "#f97316",
    },
    {
      category: "Gas",
      value: filteredExpenses
        ?.filter((expense) => expense.category === "⛽ Gas")
        .reduce((acc, curr) => acc + curr.price, 0),
      color: "#eab308",
    },
    {
      category: "Groceries",
      value: filteredExpenses
        ?.filter((expense) => expense.category === "🛒 Groceries")
        .reduce((acc, curr) => acc + curr.price, 0),
      color: "#84cc16",
    },
    {
      category: "Gym",
      value: filteredExpenses
        ?.filter((expense) => expense.category === "🏋🏼‍♂️ gym")
        .reduce((acc, curr) => acc + curr.price, 0),
      color: "#22c55e",
    },
    {
      category: "Health",
      value: filteredExpenses
        ?.filter((expense) => expense.category === "💉 Health")
        .reduce((acc, curr) => acc + curr.price, 0),
      color: "#14b8a6",
    },
    {
      category: "Restaurants",
      value: filteredExpenses
        ?.filter((expense) => expense.category === "🍽 Restaurants")
        .reduce((acc, curr) => acc + curr.price, 0),
      color: "#3b82f6",
    },
    {
      category: "Shopping",
      value: filteredExpenses
        ?.filter((expense) => expense.category === "🛍 Shopping")
        .reduce((acc, curr) => acc + curr.price, 0),
      color: "#a855f7",
    },
    {
      category: "Others",
      value: filteredExpenses
        ?.filter((expense) => expense.category === "Others")
        .reduce((acc, curr) => acc + curr.price, 0),
      color: "#6f6777",
    },
  ].filter((item) => item.value > 0);

  return (
    <>
      <h2 className="px-4 pt-1 font-semibold">Categories Summary</h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              nameKey="category"
              dataKey="value"
              innerRadius={"70%"}
              outerRadius={"90%"}
              cx="48%"
              cy="52%"
              paddingAngle={0}
            >
              {data.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.category}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              width="35%"
              layout="vertical"
              iconSize={10}
              iconType="circle"
              wrapperStyle={{ fontSize: " 12px", marginRight: 0 }}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-[240px] items-center justify-center text-lg font-semibold">
          <p>There is no expenses yet!!</p>
        </div>
      )}
    </>
  );
}

export default CategoriesChart;
