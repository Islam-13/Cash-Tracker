import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignIn from "./useSignIn";
import LoaderMini from "../../ui/LoaderMini";

function SignIn() {
  const emailReg = /[a-z-_.0-9]{3,20}@[a-z]{2,8}\.[a-z]{2,3}$/;
  const { register, formState, handleSubmit } = useForm({
    mode: "onBlur",
  });

  const { errors } = formState;

  const { signIn, isPending } = useSignIn();

  function onSubmit({ email, password }) {
    signIn({ email, password });
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

      <div className="grow bg-[#325765] p-5 tab:w-[40%]">
        <form
          className="mx-auto flex max-w-[440px] flex-col gap-4 p-4 tab:mt-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className=" text-center text-2xl font-semibold capitalize tracking-wide">
            welcome back!
          </h3>

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
                <p className="alert-msg">{errors?.email.message}</p>
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

              {errors?.password && (
                <p className="alert-msg">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <Link
              to="/forget-password"
              className="text-green-500 hover:underline"
            >
              Forget password?
            </Link>
          </div>

          <button
            disabled={isPending}
            className="btn secondary flex items-center gap-3"
          >
            {isPending ? <LoaderMini /> : ""} Sign In
          </button>

          <div className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
