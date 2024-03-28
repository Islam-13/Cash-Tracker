function TotalExpenses({ totalPrice }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-green-500 px-7 py-2 font-semibold sm:text-xl">
      <p>Total expenses</p>
      <p className="text-red-600">SAR {totalPrice}</p>
    </div>
  );
}

export default TotalExpenses;
