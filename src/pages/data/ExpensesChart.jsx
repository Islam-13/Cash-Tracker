import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ExpensesChart({ expenses, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "dd MMM"),
      totalExpenses: expenses
        .filter((expense) => isSameDay(date, new Date(expense.date)))
        .reduce((acc, curr) => acc + curr.price, 0),
    };
  });

  return (
    <>
      <h2 className="px-4 pt-1 font-semibold">
        Expenses from {format(allDates.at(0), "dd MMM yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "dd MMM yyyy")}.
      </h2>

      <ResponsiveContainer width="100%" height={270}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: "#262626" }}
            tickLine={{ stroke: "#262626" }}
          />
          <YAxis
            unit="$"
            tick={{ fill: "#262626" }}
            tickLine={{ stroke: "#262626" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#dcfce7",
              borderRadius: "7px",
            }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Area
            type="monotone"
            stroke="#16a34a"
            fill="#4ade80"
            dataKey="totalExpenses"
            strokeWidth={2}
            name="Total Expenses"
            unit=" SAR"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

export default ExpensesChart;
