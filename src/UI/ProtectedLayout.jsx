import { useEffect } from "react";
import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function ProtectedLayout({ children }) {
  const navigate = useNavigate();
  const { userLoading, isAuthenticated, user } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !userLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, userLoading, navigate]);

  if (userLoading) return <Loading />;
  if (isAuthenticated) return children;
}

export default ProtectedLayout;
