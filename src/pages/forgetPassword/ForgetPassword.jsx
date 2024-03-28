import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useForgetPassword from "./useForgetPassword";
import LoaderMini from "../../ui/LoaderMini";
import { CiCircleCheck } from "react-icons/ci";
import { useState } from "react";

function ForgetPassword() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { forgetPass, isPending } = useForgetPassword();
  const { register, formState, handleSubmit } = useForm({
    mode: "onBlur",
  });

  const emailReg = /[a-z-_.0-9]{3,20}@[a-z]{2,8}\.[a-z]{2,3}$/;
  const { errors } = formState;

  function onSubmit(data) {
    forgetPass(data.email, { onSuccess: () => setShowConfirm(true) });
  }

  return (
    <div className="flex min-h-[100dvh] flex-col gap-3 tab:flex-row-reverse">
      <div className="mx-auto flex w-[80%] flex-col justify-center p-1 sm:w-[60%] tab:w-[55%] tab:px-20">
        <img
          src="bg-forgot.png"
          alt=""
          className="mx-auto my-4 w-[170px] tab:w-[350px]"
        />
      </div>

      <div className="grow px-5 tab:w-[40%]">
        <form
          className="mx-auto flex max-w-[440px] flex-col gap-4 p-4 tab:mt-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-center text-2xl font-semibold capitalize tracking-wide">
            reset your password
          </h3>

          {!showConfirm ? (
            <>
              <p className="text-sm">
                Type in your email and we'll send you a link to reset your
                password.
              </p>

              <div className="flex flex-col gap-2">
                <label htmlFor="userEmail">Email</label>
                <div className="relative grow">
                  <input
                    type="email"
                    id="userEmail"
                    placeholder="example@yahoo.com"
                    className="input"
                    {...register("email", {
                      required: "Email is required!!",
                      pattern: {
                        value: emailReg,
                        message: "Email is not valid!!",
                      },
                    })}
                  />

                  {errors.email && (
                    <p className="alert-msg left-0 right-auto">
                      {errors?.email.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                disabled={isPending}
                className="btn mx-auto mt-7 flex items-center gap-3 bg-green-500 px-9 py-2 capitalize text-green-50"
              >
                {isPending && <LoaderMini />} send reset email
              </button>
            </>
          ) : (
            <div className="relative mt-7 rounded-lg border border-green-700 bg-green-100 py-4 pl-12 pr-4 text-green-700">
              <span className=" absolute left-4 text-2xl">
                <CiCircleCheck />
              </span>
              <h4 className=" font-semibold">Check your email!!</h4>
              <p>
                We've sent you a reset email password. Please check your email
                to continue restting your password before signing in to your
                account.
              </p>
            </div>
          )}

          <div className="text-center">
            <Link
              disabled={isPending}
              to="/signin"
              className="text-green-500 hover:underline"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
