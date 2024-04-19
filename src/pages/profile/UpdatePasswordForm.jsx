import { useForm } from "react-hook-form";
import useUpdatePassword from "./useUpdatePassword";
import LoaderMini from "../../ui/LoaderMini";

function UpdatePasswordForm({ onCloseModal }) {
  const { updatePassword, isUpdating } = useUpdatePassword();
  const { register, handleSubmit, getValues, formState } = useForm({
    mode: "onBlur",
  });
  const { errors } = formState;

  function onSubmit(data) {
    updatePassword(data, { onSuccess: onCloseModal });
  }

  return (
    <form className="formStyle" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-5 text-center text-xl font-semibold">
        Update Password
      </h2>

      <div className="formRow">
        <label htmlFor="password" className="sm:basis-32">
          New Password
        </label>
        <div className="relative grow">
          <input
            type="password"
            id="password"
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

      <div className="flex items-center justify-end gap-3">
        <button type="reset" onClick={onCloseModal} className="btn cancel">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className="btn secondary mx-[inherit]"
        >
          {isUpdating && <LoaderMini />} Update Password
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
