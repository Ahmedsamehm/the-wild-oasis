import LoginForm from "../features/authentication/LoginForm";
import useLogin from "../features/authentication/useLogin";

function Login() {
  const { Login, isPending } = useLogin();

  return (
    <>
      <LoginForm isPending={isPending} Login={Login} />
    </>
  );
}

export default Login;
