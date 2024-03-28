import { HiMiniExclamationCircle } from "react-icons/hi2";
import Loader from "../../ui/Loader";
import useGetLoggedinUser from "../profile/useGetLoggedinUser";

function Progressbar({ totalPrice }) {
  const { user, isLoading } = useGetLoggedinUser();

  if (isLoading) return <Loader />;

  const limit = user?.user_metadata.limit;

  return (
    <>
      <h1 className="flex items-center gap-2 text-xl font-bold">
        {limit - totalPrice} SAR{" "}
        {limit - totalPrice < 0 ? (
          <span className="flex w-fit items-center gap-2 rounded-md border border-red-600 bg-red-100 px-2 text-sm font-medium text-red-600">
            You have exceeded the limit <HiMiniExclamationCircle />
          </span>
        ) : (
          <span className="rounded-md border border-green-500 bg-green-100 px-2 text-sm font-medium">
            Left
          </span>
        )}
      </h1>

      <div className="my-2 h-[12px] rounded-md border bg-stone-200">
        <div
          style={{
            width: `${Math.round((totalPrice / limit) * 100)}%`,
            maxWidth: "100%",
          }}
          className={`h-[11px] rounded-md bg-gradient-to-r from-green-500 to-red-500`}
        ></div>
      </div>

      <p className="text-sm">
        You spent {totalPrice} out of {limit} SAR
      </p>
    </>
  );
}

export default Progressbar;
