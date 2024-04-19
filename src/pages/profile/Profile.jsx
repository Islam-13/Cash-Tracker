import Avatar from "../../ui/Avatar";
import Header from "../../ui/Header";
import Loader from "../../ui/Loader";
import Modal from "../../ui/Modal";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateUserForm from "./UpdateUserForm";
import useGetLoggedinUser from "./useGetLoggedinUser";

function Profile() {
  const { user, isLoading } = useGetLoggedinUser();

  if (isLoading) return <Loader />;
  return (
    <Modal>
      <Header />

      <section className="bg-profile">
        <div className="relative z-10 mx-auto max-w-[380px] gap-5 border border-transparent p-4 tab:flex tab:max-w-[80%]">
          <div className="mt-[80px] rounded-lg border bg-white py-4 shadow tab:p-7">
            <div className=" mb-4 text-center">
              <Avatar direction={"flex-col"} />
            </div>
            <div className=" flex flex-col gap-4">
              <Modal.Open opens="edit-profile">
                <button className="btn secondary">Edit Profile</button>
              </Modal.Open>

              <Modal.Open opens="edit-password">
                <button className="btn secondary-outline">
                  change password
                </button>
              </Modal.Open>

              <Modal.Window name="edit-profile">
                <UpdateUserForm userData={user} />
              </Modal.Window>

              <Modal.Window name="edit-password">
                <UpdatePasswordForm />
              </Modal.Window>
            </div>
          </div>

          <div className="mt-7 grow tab:mt-[185px]">
            <div className=" text-stone-700">
              <h2 className="my-4 hidden text-center text-xl font-semibold tab:block">
                Profile Info
              </h2>
              <div className="mx-auto sm:max-w-[600px]">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <p className="sm:basis-24">Name</p>
                  <p className="input grow capitalize">
                    {user?.user_metadata.name}
                  </p>
                </div>

                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <p className="sm:basis-24">Email</p>
                  <p className="input grow">{user?.email}</p>
                </div>

                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <p className="sm:basis-24 tab:text-sm">Expenses Limit</p>
                  <p className="input grow">
                    {user?.user_metadata?.limit
                      ? user?.user_metadata?.limit
                      : " - "}
                  </p>
                </div>

                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <p className="sm:basis-24">Phone</p>
                  <p className="input grow">
                    {user?.user_metadata?.phone
                      ? user?.user_metadata?.phone
                      : " - "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
}

export default Profile;
