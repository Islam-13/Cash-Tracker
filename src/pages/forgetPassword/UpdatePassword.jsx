import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useUpdatePassword from "../profile/useUpdatePassword";
import LoaderMini from "../../ui/LoaderMini";

function UpdatePassword() {
  const { updatePassword, isUpdating } = useUpdatePassword();
  const navigate = useNavigate();
  const { register, getValues, handleSubmit, formState } = useForm({
    mode: "onBlur",
  });
  const { errors } = formState;

  function onSubmit(data) {
    updatePassword(data, { onSuccess: () => navigate("/signin") });
  }

  return (
    <div className=" flex h-screen items-center justify-center">
      <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="mb-1 text-2xl font-semibold capitalize tracking-wide">
          reset your password
        </h3>

        <p className="mb-8 text-sm">
          Type in a new secure password and press save to update your password.
        </p>

        <div className="formRow">
          <label htmlFor="password" className="sm:basis-32">
            New Password
          </label>
          <div className="relative grow">
            <input
              type="password"
              id="password"
              placeholder="min 8 characters"
              className="input"
              {...register("password", {
                required: "Password is required!!",
                minLength: { value: 8, message: "minimum 8 chars" },
              })}
            />

            {errors.password && (
              <p className=" absolute left-2 top-[46px] rounded-sm bg-red-200 px-2 text-sm text-red-700">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="formRow">
          <label htmlFor="confirmPassword" className="sm:basis-32">
            Confirm Password
          </label>
          <div className="relative grow">
            <input
              type="password"
              id="confirmPassword"
              className="input"
              {...register("confirmPassword", {
                required: "Confirm password is required!!",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match!!",
              })}
            />

            {errors.confirmPassword && (
              <p className=" absolute left-2 top-[46px] rounded-sm bg-red-200 px-2 text-sm text-red-700">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <button
          disabled={isUpdating}
          className="btn mx-auto mt-7 flex items-center gap-3 bg-green-500 px-9 py-2 capitalize text-green-50"
        >
          {isUpdating && <LoaderMini />} save new password
        </button>

        <div className="mt-4 text-center">
          <Link
            disabled={isUpdating}
            to="/signin"
            className="text-green-500 hover:underline"
          >
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UpdatePassword;
