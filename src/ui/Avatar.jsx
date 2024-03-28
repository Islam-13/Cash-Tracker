import useGetLoggedinUser from "../pages/profile/useGetLoggedinUser";
import Loader from "./Loader";

function Avatar({ direction }) {
  const { user, isLoading } = useGetLoggedinUser();

  if (isLoading) return <Loader />;

  return (
    <div
      className={`flex ${direction} items-center gap-3 text-lg font-semibold`}
    >
      <img
        src={user?.user_metadata.avatar || "default-user.jpg"}
        alt={`avator of ${user?.user_metadata.name}`}
        className=" as block aspect-[1] w-14 rounded-full object-cover object-center outline-2 outline-stone-600"
      />
      <span className="capitalize">{user?.user_metadata.name}</span>
    </div>
  );
}

export default Avatar;
