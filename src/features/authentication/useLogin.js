import { useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginApi } from "../../services/LoginApi";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: Login, isPending } = useMutation({
    mutationFn: (LoginData) => {
      return LoginApi(LoginData);
    },
    onSuccess: (data) => {
      toast.success("Login successful");

      if (data?.user?.aud === "authenticated") {
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error("Password or Email is incorrect");
      console.log(error.message);
    },
  });
  return { Login, isPending };
}

export default useLogin;
