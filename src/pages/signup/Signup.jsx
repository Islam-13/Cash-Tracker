import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignUp from "./useSignUp";
import LoaderMini from "../../ui/LoaderMini";

function Signup() {
  const emailReg = /[a-z-_.0-9]{3,20}@[a-z]{2,8}\.[a-z]{2,3}$/;
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const { signUp, isPending } = useSignUp();

  function onSubmit({ name, email, password }) {
    signUp({ name, email, password });
  }

  return (
    <div className="bg-auth flex min-h-[100dvh] flex-col gap-3 text-green-50 tab:flex-row-reverse">
      <div className="mx-auto flex w-[80%] flex-col justify-center p-1 sm:w-[60%] tab:w-[55%] tab:px-20">
        <img src="logo.png" alt="logo" className="mx-auto my-4 w-20 tab:w-40" />

        <p className="text-center text-xs sm:leading-5 tab:text-sm">
          Your go-to online tool for effortlessly managing and tracking your
          cash flow. Gain insights, set budgets, and stay on top of your
          finances with ease.
        </p>
      </div>

      <div className="grow bg-[#325765] p-5 pb-1 tab:w-[40%]">
        <form
          className="mx-auto flex max-w-[440px] flex-col gap-4 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className=" text-center text-2xl font-semibold capitalize tracking-wide">
            get started!
          </h3>

          <div className="flex flex-col gap-2">
            <label htmlFor="userName">Name</label>
            <div className="relative grow">
              <input
                type="text"
                id="userName"
                placeholder="full name"
                className="input capitalize"
                {...register("name", {
                  required: "Full name is required!!",
                  minLength: {
                    value: 8,
                    message: "please provide your full name",
                  },
                })}
              />

              {errors.name && (
                <p className="alert-msg">{errors.name.message}</p>
              )}
            </div>
          </div>

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
                  pattern: { value: emailReg, message: "Email is not valid!!" },
                })}
              />

              {errors.email && (
                <p className="alert-msg">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="userPassword">Password</label>
            <div className="relative grow">
              <input
                type="password"
                id="userPassword"
                placeholder="min 8 characters"
                className="input"
                {...register("password", {
                  required: "Password is required!!",
                  minLength: {
                    value: 8,
                    message: "minimum of 8 chars",
                  },
                })}
              />

              {errors.password && (
                <p className="alert-msg">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="userRepassword">Confirm password</label>
            <div className="relative grow">
              <input
                type="password"
                id="userRepassword"
                className="input"
                {...register("repassword", {
                  required: "Repassword is required!!",
                  validate: (value) =>
                    value === getValues().password || "Passwords need to match",
                })}
              />

              {errors.repassword && (
                <p className="alert-msg">{errors.repassword.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="userPhone">Phone</label>
            <div className="grow">
              <input
                type="tel"
                id="userPhone"
                className="input"
                placeholder="Optional"
                {...register("phone")}
              />
            </div>
          </div>

          <button
            disabled={isPending}
            className="btn secondary flex items-center gap-3"
          >
            {isPending ? <LoaderMini /> : ""} Sign Up
          </button>

          <div className="text-center">
            Have an account?{" "}
            <Link to="/signin" className="text-green-500 hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
