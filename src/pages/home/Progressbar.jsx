import { HiMiniExclamationCircle } from "react-icons/hi2";
import Loader from "../../ui/Loader";
import useGetLoggedinUser from "../profile/useGetLoggedinUser";

function Progressbar({ totalPrice }) {
  const { user, isLoading } = useGetLoggedinUser();

  if (isLoading) return <Loader />;

  const limit = user?.user_metadata.limit;

  return (
    <div className="mx-auto w-[94%] max-w-[700px] rounded-lg px-5">
      <h1 className="flex items-center gap-2 text-xl font-bold">
        {limit - totalPrice} SAR{" "}
        {limit - totalPrice < 0 ? (
          <span className="flex w-fit items-center gap-2 rounded-md border border-red-600 bg-red-100 px-2 text-sm font-medium text-red-600">
            You have exceeded the limit. <HiMiniExclamationCircle />
          </span>
        ) : (
          <span className="rounded-md border border-green-500 bg-green-100 px-2 text-sm font-medium">
            Left
          </span>
        )}
      </h1>

      <div className="relative my-2 h-[12px] rounded-md bg-gradient-to-r from-green-500 to-red-500">
        <div
          style={{ width: `${100 - Math.round((totalPrice / limit) * 100)}%` }}
          className="absolute right-[-1px] top-0 h-[12px] max-w-full rounded-e-md bg-stone-200"
        ></div>
      </div>

      <p className="text-sm">
        You have spent <strong className=" text-red-500">{totalPrice}</strong>{" "}
        out of <strong className=" text-green-500">{limit}</strong> SAR.
      </p>
    </div>
  );
}

export default Progressbar;
