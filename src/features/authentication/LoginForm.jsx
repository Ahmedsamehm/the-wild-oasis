import { useForm } from "react-hook-form";

import useLogin from "./useLogin";
import Loading from "../../UI/Loading";

function LoginForm({ isPending, Login }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    Login(data);
    console.log(data);
    
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center min-h-screen  px-4 w-full  ">
          <fieldset className="fieldset flex-1/2  max-w-xl   bg-base-200 border border-base-300 p-4 rounded-box ">
            <legend className="fieldset-legend">Login</legend>

            <label className="fieldset-label">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="input w-full "
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            <label className="fieldset-label">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="input w-full "
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
            <button
              disabled={isPending}
              type="submit"
              className="btn btn-neutral mt-4"
            >
              {isPending ? <Loading /> : "Login"}
            </button>
          </fieldset>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
