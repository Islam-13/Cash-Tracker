import { useForm } from "react-hook-form";
import useUpdateUserData from "./useUpdateUserData";
import LoaderMini from "../../ui/LoaderMini";

function UpdateUserForm({ userData, onCloseModal }) {
  const { updateUser, isUpdating } = useUpdateUserData();
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
  });
  const { errors } = formState;

  function onSubmit(data) {
    const newData = { ...data, avatar: data.avatar[0] };
    updateUser(newData, { onSuccess: onCloseModal });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formStyle">
      <h2 className="mb-5 text-center text-xl font-semibold">
        Update User Data
      </h2>

      <div className="formRow">
        <label htmlFor="email" className="sm:basis-24">
          Email
        </label>
        <div className="relative grow">
          <input
            type="email"
            id="email"
            className="input"
            disabled
            defaultValue={userData.email}
          />
        </div>
      </div>

      <div className="formRow">
        <label htmlFor="name" className="sm:basis-24">
          Name
        </label>
        <div className="relative grow">
          <input
            type="text"
            id="name"
            className="input"
            defaultValue={userData.user_metadata.name}
            {...register("name", {
              required: "Name is required!!",
              minLength: { value: 3, message: "minimum 3 chars" },
            })}
          />

          {errors.name && (
            <p className=" absolute left-2 top-[46px] rounded-sm bg-red-200 px-2 text-sm text-red-700">
              {errors.name.message}
            </p>
          )}
        </div>
      </div>

      <div className="formRow">
        <label htmlFor="phone" className="sm:basis-24">
          Phone
        </label>
        <div className="relative grow">
          <input
            type="tel"
            id="phone"
            defaultValue={userData.user_metadata.phone}
            className="input"
            {...register("phone", {
              minLength: {
                value: 10,
                message: "Please provide a vaild number",
              },
            })}
          />

          {errors.phone && (
            <p className=" absolute left-2 top-[46px] rounded-sm bg-red-200 px-2 text-sm text-red-700">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div className="formRow">
        <label htmlFor="limit" className="sm:basis-24">
          Expenses Limit
        </label>
        <div className="relative grow">
          <input
            type="numbers"
            id="limit"
            defaultValue={userData.user_metadata.limit}
            className="input"
            {...register("limit", {
              minLength: {
                value: 1,
                message: "Expenses limit is requierd!!",
              },
            })}
          />

          {errors.limit && (
            <p className=" absolute left-2 top-[46px] rounded-sm bg-red-200 px-2 text-sm text-red-700">
              {errors.limit.message}
            </p>
          )}
        </div>
      </div>

      <div className="formRow">
        <label htmlFor="avatar" className="sm:basis-24">
          Avatar image
        </label>
        <div className="relative grow">
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="input file:cursor-pointer file:rounded-md file:border-0 file:bg-green-500 file:tracking-wider file:text-green-50"
            {...register("avatar")}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="reset"
          disabled={isUpdating}
          onClick={onCloseModal}
          className="btn cancel"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isUpdating}
          className="btn secondary mx-[inherit]"
        >
          {isUpdating && <LoaderMini />} Update Profile
        </button>
      </div>
    </form>
  );
}

export default UpdateUserForm;
